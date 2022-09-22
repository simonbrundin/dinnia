import createAuth0Client from '@auth0/auth0-spa-js'

// these configuration should match on Auth0 platform
let auth = await createAuth0Client({
  domain: 'simonbrundin.eu.auth0.com',
  client_id: 'iCJbdVCxosX2LToHLuQtQrAJUD0NO3CG',
  redirect_uri: 'http://localhost:3001',
})

export default auth
