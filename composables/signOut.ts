export const signOut = () => {
  nhost.auth.signOut();
  navigateTo("login");
  return;
};
