export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLoggedIn = await nhost.auth.isAuthenticatedAsync();
  if (!isLoggedIn && to.fullPath !== "/login") {
    return navigateTo("/login");
  }
  navigateTo("/");
});
