const router = useRouter();
const alreadyLoggedIn = () => nhost.auth.isAuthenticated();
const loginWithPasskey = async (email: string) => {
  const { error, session } = await nhost.auth.signIn({
    email,
    securityKey: true,
  });

  return { error, session };
};
const loginWithMagicLink = async (email: string) => {
  const { error, session } = await nhost.auth.signIn({
    email,
  });
  return { error, session };
};

export const signIn = async (email: string) => {
  if (alreadyLoggedIn()) {
    navigateTo("/");
    return;
  }
  const { error, session: loginSuccessful } = await loginWithPasskey(email);
  if (loginSuccessful) {
    navigateTo("/");
    return;
  }
  if (error?.message === "WebAuthn is not supported in this browser") {
    await loginWithMagicLink(email);
  }
  if (error?.error === "user-not-found") {
    const res = await signUp(email);
    console.log(res);
  }
  console.log(error);
  return { error };
};
