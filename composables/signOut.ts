export const signOut = () => {
  nhost.auth.signOut();
  navigateTo("auth/login");
  return;
};
