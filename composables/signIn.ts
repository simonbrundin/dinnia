import { useAuthStore } from "../stores/auth";
const router = useRouter();
const alreadyLoggedIn = () => nhost.auth.isAuthenticated();
const loginWithPasskey = async (email: string) => {
  const { error, session } = await nhost.auth.signIn({
    email,
    securityKey: true,
  });

  if (error) {
    throw error;
  }
  if (!session) {
    navigateTo("/verify-email");
    throw "User needs to verify email";
  }
  navigateTo("/");

  return session;
};
const loginWithMagicLink = async (email: string) => {
  const { error, session } = await nhost.auth.signIn({
    email,
  });
  if (error) {
    throw error;
  }
  if (!session) {
    navigateTo("/verify-email");
    throw "User needs to verify email";
  }
  navigateTo("/");
  return session;
};

export const signIn = async (email: string, password?: string) => {
  if (alreadyLoggedIn()) {
    navigateTo("/");
    return "Successful login";
  }
  let latestError;
  try {
    await loginWithPasskey(email);
    console.log("ok");
    return;
  } catch (error) {
    console.log(error);
    latestError = error;
  }
  try {
    await loginWithMagicLink(email);
    return;
  } catch (error) {
    latestError = error;
  }
  // try {
  //   await signUp(email, password);
  //   return;
  // } catch (error) {
  //   latestError = error;
  // }
  if (latestError) {
    const authStore = useAuthStore();
    authStore.signInErrorMessage = latestError.message;
  }

  return;
};
