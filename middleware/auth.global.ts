export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path === "/login") {
    return;
  }
  const user = useSupabaseUser();
  if (!user.value) {
    return navigateTo("/login");
  }
});
