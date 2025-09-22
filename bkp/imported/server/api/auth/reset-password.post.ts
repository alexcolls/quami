import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  type ConfirmForgotPasswordCommandInput,
  UserNotFoundException,
  InvalidPasswordException,
  CodeMismatchException,
  ExpiredCodeException,
  InvalidParameterException,
  LimitExceededException,
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

interface ResetPasswordRequestBody {
  email: string;
  code: string;
  newPassword: string;
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
    console.error('Cognito configuration is missing or incomplete for reset password.');
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error.',
    });
  }

  const body = await readBody<ResetPasswordRequestBody>(event);
  const { email, code, newPassword } = body;

  if (!email || typeof email !== 'string' ||
      !code || typeof code !== 'string' ||
      !newPassword || typeof newPassword !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email, confirmation code, and new password are required and must be strings.',
    });
  }

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

  // Basic password policy check (example: at least 8 chars).
  // Your Cognito User Pool has its own password policy which will be enforced.
  if (newPassword.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: 'New password must be at least 8 characters long.',
    });
  }

  const cognitoClient = new CognitoIdentityProviderClient({
    region: cognito.region,
  });

  const confirmForgotPasswordParams: ConfirmForgotPasswordCommandInput = {
    ClientId: cognito.clientId,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
  };

  if (cognito.clientSecret) {
    confirmForgotPasswordParams.SecretHash = calculateSecretHash(
      email,
      cognito.clientId,
      cognito.clientSecret
    );
  }

  try {
    const command = new ConfirmForgotPasswordCommand(confirmForgotPasswordParams);
    await cognitoClient.send(command);

    return {
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.',
    };

  } catch (error: unknown) {
    console.error('Cognito Confirm Forgot Password Error:', error);

    if (error instanceof UserNotFoundException) {
      // Again, to prevent enumeration, a generic error might be preferred if Cognito doesn't hide this.
      throw createError({
        statusCode: 404,
        statusMessage: error.message || 'User not found.',
        data: { code: error.name }
      });
    } else if (error instanceof InvalidPasswordException) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message || 'New password does not meet the policy requirements.',
        data: { code: error.name }
      });
    } else if (error instanceof CodeMismatchException) {
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
    } else if (error instanceof InvalidParameterException) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message || 'Invalid parameter provided for password reset confirmation.',
        data: { code: error.name }
      });
    } else if (error instanceof LimitExceededException) {
        throw createError({
        statusCode: 429, // Too Many Requests
        statusMessage: error.message || 'Attempt limit exceeded, please try again later.',
        data: { code: error.name }
      });
    } else if (error instanceof NotAuthorizedException) {
        throw createError({
        statusCode: 401, // Or 400 if it's a client error
        statusMessage: error.message || 'Authorization error during password reset confirmation.',
        data: { code: error.name }
      });
    } else if (error instanceof Error && error.message.includes("configured with secret but SECRET_HASH was not received")) {
       throw createError({
        statusCode: 400,
        statusMessage: "Client is configured with a secret, but SECRET_HASH was not correctly provided or calculated. Check server configuration.",
        data: { code: 'MissingOrInvalidSecretHash' }
      });
    }
    
    const errorMessage = (error instanceof Error && error.message) ? error.message : 'An unexpected error occurred while resetting password.';
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage,
      data: { code: (error instanceof Error) ? error.name : 'UnknownResetPasswordError' }
    });
  }
});
