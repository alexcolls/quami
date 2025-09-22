import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
  NotAuthorizedException,
  UserNotFoundException,
  UserNotConfirmedException,
  PasswordResetRequiredException,
  type InitiateAuthCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import { defineEventHandler, readBody, setCookie, createError } from 'h3';
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

interface IdTokenPayload {
  sub: string;
  email_verified?: boolean;
  iss: string;
  'cognito:username': string;
  origin_jti?: string;
  aud: string;
  event_id: string;
  token_use: 'id';
  auth_time: number;
  exp: number;
  iat: number;
  jti?: string;
  email?: string;
  [key: string]: string | number | boolean | undefined;
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

function parseIdTokenPayload(idToken: string): IdTokenPayload | null {
  try {
    const payloadBase64 = idToken.split('.')[1];
    if (!payloadBase64) {
      return null;
    }
    const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    return JSON.parse(decodedPayload) as IdTokenPayload;
  } catch (e) {
    console.error("Failed to parse IdToken payload:", e);
    return null;
  }
}

export default defineEventHandler(async (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig(event) as MyRuntimeConfig;
  const { cognito } = runtimeConfig;

  if (!cognito || !cognito.region || !cognito.clientId || !cognito.userPoolId) {
    console.error('Cognito configuration is missing or incomplete. Required: region, clientId, userPoolId.');
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error.',
    });
  }
  // If clientSecret is mandatory for this setup, this check is fine.
  // If it's optional (some app clients might not have a secret), this check should be removed or made conditional.
  // Based on your provided code, it seems clientSecret is expected.
  if (cognito.clientSecret === undefined) { // Check for undefined specifically if it can be an empty string intentionally
     console.error('Cognito clientSecret is missing in configuration.');
     throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: Client secret missing.',
    });
  }


  const body = await readBody(event);
  const { email, pass } = body;

  if (!email || typeof email !== 'string' || !pass || typeof pass !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required and must be strings.',
    });
  }

  const cognitoClient = new CognitoIdentityProviderClient({
    region: cognito.region,
  });

  const authParams: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: cognito.clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: pass,
    },
  };

  if (cognito.clientSecret) { // This handles if clientSecret is an empty string vs undefined
    if (!authParams.AuthParameters) {
      authParams.AuthParameters = {};
    }
    authParams.AuthParameters.SECRET_HASH = calculateSecretHash(
      email,
      cognito.clientId,
      cognito.clientSecret
    );
  }

  try {
    const command = new InitiateAuthCommand(authParams);
    const response = await cognitoClient.send(command);

    if (response.AuthenticationResult) {
      const { AccessToken, IdToken, RefreshToken, ExpiresIn } = response.AuthenticationResult;

      if (!AccessToken || !IdToken) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Authentication successful but tokens are missing.',
        });
      }
      
      const idTokenPayload = parseIdTokenPayload(IdToken);
      const userId = idTokenPayload?.sub;

      if (!userId) {
        console.error('Failed to extract userId (sub) from IdToken.');
        throw createError({
            statusCode: 500,
            statusMessage: 'Authentication successful but failed to process user identity.',
        });
      }

      const secureCookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
      };

      setCookie(event, 'oriane_access_token', AccessToken, {
        ...secureCookieOptions,
        maxAge: ExpiresIn || 3600,
      });
      
      setCookie(event, 'oriane_id_token', IdToken, {
        ...secureCookieOptions,
        maxAge: ExpiresIn || 3600,
      });

      if (RefreshToken) {
        setCookie(event, 'oriane_refresh_token', RefreshToken, {
          ...secureCookieOptions,
          maxAge: 30 * 24 * 60 * 60, // 30 days example
        });
      }
      
      return {
        success: true,
        message: 'Login successful.',
        email: email,
        userId: userId,
        accessToken: AccessToken,
        idToken: IdToken,
        refreshToken: RefreshToken || null,
        expiresIn: ExpiresIn || 3600,
      };

    } else if (response.ChallengeName) {
      throw createError({
        statusCode: 401,
        statusMessage: `Login challenge presented: ${response.ChallengeName}. This flow requires additional steps.`,
        data: {
          challengeName: response.ChallengeName,
          session: response.Session,
        }
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Authentication failed: Unexpected response structure from Cognito.',
      });
    }
  } catch (error: unknown) {
    console.error('Cognito Login Error:', error);

    if (error instanceof NotAuthorizedException) {
      throw createError({
        statusCode: 401,
        statusMessage: error.message || 'Incorrect email or password.',
        data: { code: error.name }
      });
    } else if (error instanceof UserNotFoundException) {
      throw createError({
        statusCode: 404,
        statusMessage: error.message || 'User not found.',
        data: { code: error.name }
      });
    } else if (error instanceof UserNotConfirmedException) {
      throw createError({
        statusCode: 403,
        statusMessage: error.message || 'User account is not confirmed. Please check your email.',
        data: { code: error.name, email: email } // Optionally return email for client to offer resend
      });
    } else if (error instanceof PasswordResetRequiredException) {
      throw createError({
        statusCode: 400, // Or a custom code indicating password reset needed
        statusMessage: error.message || 'Password reset is required for this user.',
        data: { code: error.name }
      });
    } else if (error instanceof Error && error.message.includes("configured with secret but SECRET_HASH was not received")) {
       throw createError({
        statusCode: 400,
        statusMessage: "Client is configured with a secret, but SECRET_HASH was not correctly provided or calculated. Check server configuration.",
        data: { code: 'MissingOrInvalidSecretHash' }
      });
    }
    
    const errorMessage = (error instanceof Error && error.message) ? error.message : 'An unexpected error occurred during login.';
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage,
      data: { code: (error instanceof Error) ? error.name : 'UnknownError' }
    });
  }
});
