const router = useRouter();
export const signUpWithPasskey = async (email: string) => {
  const { error, session } = await nhost.auth.signUp({
    email,
    securityKey: true,
  });
  if (error) {
    throw error;
  }
  if (!session) {
    navigateTo("/auth/verify");
    throw "User needs to verify email";
  }
  navigateTo("/");
  return session;
};
const signUpWithMagicLink = async (email: string, password?: string) => {
  const { error, session } = await nhost.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  if (!session) {
    navigateTo("/auth/verify");
    throw "User needs to verify email";
  }
  navigateTo("/");
  return session;
};
export const signUp = async (email: string, password?: string) => {
  console.log("Start signUp");

  try {
    // await signUpWithPasskey(email);
    await signUpWithMagicLink(email, password);
    const authStore = useAuthStore();
    authStore.signInErrorMessage = "";
    return;
  } catch (error) {
    const authStore = useAuthStore();
    authStore.signInErrorMessage = error.message;
  }
};
