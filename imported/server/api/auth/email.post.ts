import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
  type ListUsersCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import { defineEventHandler, readBody, createError } from 'h3';
import type { H3Event } from 'h3';

interface RuntimeConfigCognito {
  region: string;
  userPoolId: string;
  // clientId and clientSecret are not strictly needed for ListUsers,
  // but might be part of your standard cognito config object
  clientId?: string;
  clientSecret?: string;
}

interface MyRuntimeConfig {
  cognito: RuntimeConfigCognito;
  // other runtime configs
}

export default defineEventHandler(async (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig(event) as MyRuntimeConfig;
  const { cognito } = runtimeConfig;

  if (!cognito || !cognito.region || !cognito.userPoolId) {
    console.error('Cognito configuration is missing User Pool ID or region.');
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error.',
    });
  }

  const body = await readBody(event);
  const { email } = body;

  if (!email || typeof email !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required and must be a string.',
    });
  }

  // Basic email format validation (optional, but good practice)
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

  const params: ListUsersCommandInput = {
    UserPoolId: cognito.userPoolId,
    Filter: `email = "${email}"`,
    Limit: 1, // We only need to find one match to confirm existence
  };

  try {
    const command = new ListUsersCommand(params);
    const response = await cognitoClient.send(command);

    let exists = false;
    if (response.Users && response.Users.length > 0 ) {
      exists = true;
    } 
    let isConfirmed = false;
    if (exists && response?.Users?.[0]?.UserStatus === 'CONFIRMED') {
      isConfirmed = true;
    }

    return { exists, isConfirmed };
    
  } catch (error: unknown) {
    console.error('Cognito ListUsers Error:', error);
    // Avoid leaking detailed error information unless necessary for specific client handling.
    // This could be a UserPoolNotFoundException, InvalidParameterException, etc.
    // For a simple existence check, a generic server error is often sufficient for the client.
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while checking email existence.',
      data: { code: (error instanceof Error) ? error.name : 'UnknownCognitoError' }
    });
  }
});
