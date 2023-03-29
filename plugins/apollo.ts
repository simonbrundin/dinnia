export default defineNuxtPlugin((nuxtApp) => {
  // access cookie for auth
  // const cookie = useCookie("<cookie_name>");

  nuxtApp.hook("apollo:auth", ({ client, token }) => {
    while (!nhost.auth.getAccessToken()) {}
    // `client` can be used to differentiate logic on a per client basis.
    const accessToken = nhost.auth.getAccessToken();

    // apply apollo client token
    token.value = "Bearer " + accessToken;
  });
});
