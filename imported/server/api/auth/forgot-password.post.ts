import {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand,
  type ForgotPasswordCommandInput,
  UserNotFoundException,
  InvalidParameterException,
  LimitExceededException,
  CodeDeliveryFailureException,
  NotAuthorizedException, // Can occur if client secret is misconfigured
} from "@aws-sdk/client-cognito-identity-provider";
import { defineEventHandler, readBody, createError } from 'h3';
import type { H3Event } from 'h3';
import { createHmac } from 'crypto';

interface RuntimeConfigCognito {
  region: string;
  clientId: string;
  clientSecret?: string;
  userPoolId: string;
}

interface MyRuntimeConfig {
  cognito: RuntimeConfigCognito;
}

interface ForgotPasswordRequestBody {
  email: string;
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
  const runtimeConfig = useRuntimeConfig(event) as MyRuntimeConfig;
  const { cognito } = runtimeConfig;

  if (!cognito || !cognito.region || !cognito.clientId || !cognito.userPoolId) {
    console.error('Cognito configuration is missing or incomplete for forgot password.');
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error.',
    });
  }

  const body = await readBody<ForgotPasswordRequestBody>(event);
  const { email } = body;

  if (!email || typeof email !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required and must be a string.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format.',
    });
  }

  const cognitoClient = new CognitoIdentityProviderClient({
    region: cognito.region,
  });

  const forgotPasswordParams: ForgotPasswordCommandInput = {
    ClientId: cognito.clientId,
    Username: email,
  };

  if (cognito.clientSecret) {
    forgotPasswordParams.SecretHash = calculateSecretHash(
      email,
      cognito.clientId,
      cognito.clientSecret
    );
  }

  try {
    const command = new ForgotPasswordCommand(forgotPasswordParams);
    const response = await cognitoClient.send(command);

    return {
      success: true,
      message: 'Password reset code sent successfully. Please check your email.',
      codeDeliveryDetails: response.CodeDeliveryDetails,
    };

  } catch (error: unknown) {
    console.error('Cognito Forgot Password Error:', error);

    // Cognito's ForgotPassword API is designed to not reveal if a user exists for security reasons,
    // so it often returns successfully even if the user is not found, but CodeDeliveryDetails might be absent or indicate failure.
    // However, specific exceptions can still occur.

    if (error instanceof UserNotFoundException) {
      // To prevent user enumeration, you might want to return a generic success message here too.
      // However, if "Prevent user existence errors" is enabled on your app client, Cognito handles this.
      // If not, and you want to be explicit (though less secure):
      // throw createError({
      //   statusCode: 404,
      //   statusMessage: error.message || 'User with this email not found.',
      //   data: { code: error.name }
      // });
      // For better security, return a generic success to prevent enumeration:
      return {
        success: true, // Still true from client's perspective to prevent enumeration
        message: 'If an account with that email exists, a password reset code has been sent.',
      };
    } else if (error instanceof InvalidParameterException) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message || 'Invalid parameter provided for password reset.',
        data: { code: error.name }
      });
    } else if (error instanceof LimitExceededException) {
        throw createError({
        statusCode: 429, // Too Many Requests
        statusMessage: error.message || 'Attempt limit exceeded, please try again later.',
        data: { code: error.name }
      });
    } else if (error instanceof CodeDeliveryFailureException) {
        throw createError({
        statusCode: 500,
        statusMessage: error.message || 'Failed to deliver password reset code. Please ensure the email is correct or try again later.',
        data: { code: error.name }
      });
    } else if (error instanceof NotAuthorizedException) {
        // Typically due to SecretHash issues if client secret is configured
        throw createError({
        statusCode: 400, // Or 500 if it's a server config issue
        statusMessage: error.message || 'Authorization error during password reset process.',
        data: { code: error.name }
      });
    } else if (error instanceof Error && error.message.includes("configured with secret but SECRET_HASH was not received")) {
       throw createError({
        statusCode: 400,
        statusMessage: "Client is configured with a secret, but SECRET_HASH was not correctly provided or calculated. Check server configuration.",
        data: { code: 'MissingOrInvalidSecretHash' }
      });
    }
    
    const errorMessage = (error instanceof Error && error.message) ? error.message : 'An unexpected error occurred while initiating password reset.';
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage,
      data: { code: (error instanceof Error) ? error.name : 'UnknownForgotPasswordError' }
    });
  }
});
