import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  type SignUpCommandInput,
  type AttributeType,
  UsernameExistsException,
  InvalidPasswordException,
  InvalidParameterException,
  CodeDeliveryFailureException,
} from "@aws-sdk/client-cognito-identity-provider";
import { defineEventHandler, readBody, createError } from 'h3';
import type { H3Event } from 'h3';
import { createHmac } from 'crypto';

interface SignUpRequestBody {
  email: string;
  pass: string;
}

function calculateSecretHash(
  username: string,
  clientId: string,
  clientSecret: string
): string {
  const hmac = createHmac('sha256', clientSecret);
  hmac.update(username + clientId);
  return hmac.digest('base64');
}

export default defineEventHandler(async (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const { cognito } = runtimeConfig;

  if (!cognito || !cognito.region || !cognito.clientId || !cognito.userPoolId || !cognito.clientSecret) {
    console.error('Cognito configuration is missing or incomplete for sign-up.');
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error.',
    });
  }

  const body = await readBody<SignUpRequestBody>(event);
  const { email, pass } = body; // Destructure other attributes as needed

  if (!email || typeof email !== 'string' || !pass || typeof pass !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required and must be strings.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format.',
    });
  }

  if (pass.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password must be at least 8 characters long.',
    });
  }

  const cognitoClient = new CognitoIdentityProviderClient({
    region: cognito.region,
  });

  const userAttributes: AttributeType[] = [
    { Name: 'email', Value: email },
  ];

  const signUpParams: SignUpCommandInput = {
    ClientId: cognito.clientId,
    Username: email, // Using email as the username
    Password: pass,
    UserAttributes: userAttributes,
  };

  if (cognito.clientSecret) {
    signUpParams.SecretHash = calculateSecretHash(
      email, // Username used in hash
      cognito.clientId,
      cognito.clientSecret
    );
  }

  try {
    const command = new SignUpCommand(signUpParams);
    const response = await cognitoClient.send(command);

    return {
      success: true,
      message: 'Sign-up successful. Please check your email for a confirmation code.',
      userConfirmed: response.UserConfirmed, // False if confirmation is pending
      userSub: response.UserSub, // The unique ID for the user
      codeDeliveryDetails: response.CodeDeliveryDetails,
    };

  } catch (error: unknown) {
    console.error('Cognito SignUp Error:', error);

    if (error instanceof UsernameExistsException) {
      throw createError({
        statusCode: 409, // Conflict
        statusMessage: error.message || 'An account with this email already exists.',
        data: { code: error.name }
      });
    } else if (error instanceof InvalidPasswordException) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message || 'Password does not meet the requirements. Please check the password policy.',
        data: { code: error.name }
      });
    } else if (error instanceof InvalidParameterException) {
      // This can happen for various reasons, e.g., attribute format incorrect
      throw createError({
        statusCode: 400,
        statusMessage: error.message || 'Invalid parameter provided for sign-up.',
        data: { code: error.name }
      });
    } else if (error instanceof CodeDeliveryFailureException) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message || 'Failed to deliver confirmation code. Please ensure your email is correct and try again.',
        data: { code: error.name }
      });
    } else if (error instanceof Error && error.message.includes("configured with secret but SECRET_HASH was not received")) {
       throw createError({
        statusCode: 400,
        statusMessage: "Client is configured with a secret, but SECRET_HASH was not correctly provided or calculated. Check server configuration if a client secret is used.",
        data: { code: 'MissingSecretHash' }
      });
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'An unexpected error occurred during sign-up.',
      data: { code: (error instanceof Error) ? error.name : 'UnknownSignUpError' }
    });
  }
});
