import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { getCookie, sendError } from 'h3';
import type { H3Event } from 'h3';

const config = useRuntimeConfig();

const verifier = CognitoJwtVerifier.create({
  userPoolId: config.cognito.userPoolId,
  tokenUse: 'access',
  clientId: config.cognito.clientId,
});

const PROTECTED_API_ROUTES_PREFIX = '/api/';
const PUBLIC_API_ROUTES = [
  '/api/docs',
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/email',
  '/api/auth/confirm-email',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/assets/video-grid',
];

export default defineEventHandler(async (event: H3Event) => {
  const path = event.node.req.url || '';
  if (path.startsWith(PROTECTED_API_ROUTES_PREFIX) 
    &&!PUBLIC_API_ROUTES.some(publicRoute => path.startsWith(publicRoute))
  ) {
    const accessToken = getCookie(event, 'cognito_access_token');
    if (!accessToken) {
      console.log('No access token found for protected API route:', path);
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: No access token',
      }));
    }
    try {
      const payload = await verifier.verify(accessToken, {
        tokenUse: 'access',
        clientId: config.awsCognitoClientId,
      });
      event.context.auth = { user: payload };
      console.log('Access token verified for user:', payload.username);
    } catch (error) {
      console.error('Access token verification failed for API route:', path, error);
      // TODO: handle token expiry here by trying to refresh it
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Invalid access token',
      }));
    }
  }
});
