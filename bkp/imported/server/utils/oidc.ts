import type { Client } from 'openid-client';
import { Issuer, generators, TokenSet } from 'openid-client'
import { useRuntimeConfig }            from '#imports'

let oidcClient: Client

export async function getOidcClient() {
  if (oidcClient) return oidcClient

  const { region, userPoolId, clientId, clientSecret, redirectUri } = useRuntimeConfig().cognito
  const issuer = await Issuer.discover(
    `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/openid-configuration`
  )

  oidcClient = new issuer.Client({
    client_id:     clientId,
    client_secret: clientSecret || undefined,
    redirect_uris: [ redirectUri ],
    response_types: ['code']
  })

  return oidcClient
}

// ← make sure this is exported!
export function generateStateNonce() {
  return { state: generators.state(), nonce: generators.nonce() }
}
