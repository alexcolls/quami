import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  type ConfirmSignUpCommandInput,
  CodeMismatchException,
  ExpiredCodeException,
  UserNotFoundException,
  NotAuthorizedException,
  AliasExistsException,
  InvalidParameterException,
  LimitExceededException,
} from "@aws-sdk/client-cognito-identity-provider";
import { defineEventHandler, readBody, createError } from 'h3';
import type { H3Event } from 'h3';
import { createHmac } from 'crypto';

interface ConfirmEmailRequestBody {
  email: string;
  code: string;
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
    console.error('Cognito configuration is missing or incomplete for email confirmation.');
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error.',
    });
  }

  const body = await readBody<ConfirmEmailRequestBody>(event);
  const { email, code } = body;

  if (!email || typeof email !== 'string' || !code || typeof code !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and confirmation code are required and must be strings.',
    });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format.',
    });
  }

  // Basic code format validation (Cognito codes are typically 6 digits)
  if (!/^\d{6}$/.test(code)) {
     throw createError({
      statusCode: 400,
      statusMessage: 'Invalid confirmation code format. It should be 6 digits.',
    });
  }

  const cognitoClient = new CognitoIdentityProviderClient({
    region: cognito.region,
  });

  const confirmSignUpParams: ConfirmSignUpCommandInput = {
    ClientId: cognito.clientId,
    Username: email,
    ConfirmationCode: code,
  };

  if (cognito.clientSecret) {
    confirmSignUpParams.SecretHash = calculateSecretHash(
      email, // Username (email) used for the hash
      cognito.clientId,
      cognito.clientSecret
    );
  }

  try {
    const command = new ConfirmSignUpCommand(confirmSignUpParams);
    await cognitoClient.send(command);

    return {
      success: true,
      message: 'Email confirmed successfully. You can now log in.',
    };

  } catch (error: unknown) {
    console.error('Cognito Confirm SignUp Error:', error);

    if (error instanceof CodeMismatchException) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message || 'Invalid confirmation code.',
        data: { code: error.name }
      });
    } else if (error instanceof ExpiredCodeException) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message || 'Confirmation code has expired. Please request a new one.',
        data: { code: error.name }
      });
    } else if (error instanceof UserNotFoundException) {
      throw createError({
        statusCode: 404,
        statusMessage: error.message || 'User not found. Please check the email address.',
        data: { code: error.name }
      });
    } else if (error instanceof NotAuthorizedException) {
      // This can happen if SecretHash is wrong/missing when client has a secret,
      // or if the user is already confirmed.
      throw createError({
        statusCode: 401, // Or 400 if it's due to user already confirmed
        statusMessage: error.message || 'Not authorized to confirm this user, or user may already be confirmed.',
        data: { code: error.name }
      });
    } else if (error instanceof AliasExistsException) {
      // This means the email (if it's an alias like phone) is already confirmed for another user.
      // Less common if confirming the primary email used for signup.
      throw createError({
        statusCode: 409, // Conflict
        statusMessage: error.message || 'This email address is already associated with another confirmed account.',
        data: { code: error.name }
      });
    } else if (error instanceof InvalidParameterException) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message || 'Invalid parameter provided for confirmation.',
        data: { code: error.name }
      });
    } else if (error instanceof LimitExceededException) {
        throw createError({
        statusCode: 429, // Too Many Requests
        statusMessage: error.message || 'Attempt limit exceeded, please try again later.',
        data: { code: error.name }
      });
    } else if (error instanceof Error && error.message.includes("configured with secret but SECRET_HASH was not received")) {
       throw createError({
        statusCode: 400,
        statusMessage: "Client is configured with a secret, but SECRET_HASH was not correctly provided or calculated. Check server configuration.",
        data: { code: 'MissingOrInvalidSecretHash' }
      });
    }
    
    const errorMessage = (error instanceof Error && error.message) ? error.message : 'An unexpected error occurred during email confirmation.';
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage,
      data: { code: (error instanceof Error) ? error.name : 'UnknownConfirmationError' }
    });
  }
});