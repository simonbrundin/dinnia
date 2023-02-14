export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/login") {
    return;
  }
  const isAuthenticated = nhost.auth.isAuthenticated();

  if (!isAuthenticated) {
    return navigateTo("/login");
  }
});
