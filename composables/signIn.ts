import { useAuthStore } from "../stores/auth";
const router = useRouter();
const alreadyLoggedIn = () => nhost.auth.isAuthenticated();
export const loginWithPasskey = async (email: string) => {
  const { error, session } = await nhost.auth.signIn({
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
export const loginWithMagicLink = async (email: string) => {
  const { error, session } = await nhost.auth.signIn({
    email,
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

const loginWithPassword = async (email: string, password: string) => {
  const { error, session } = await nhost.auth.signIn({
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

export const signIn = async (email: string, password?: string) => {
  if (alreadyLoggedIn()) {
    navigateTo("/");
    return "Successful login";
  }
  let latestError;
  try {
    await signUp(email, password);
    return;
  } catch (error) {
    latestError = error;
  }
  if (password) {
    try {
      await loginWithPassword(email, password);
      const authStore = useAuthStore();
      authStore.signInErrorMessage = "";
      return;
    } catch (error) {
      const authStore = useAuthStore();
      authStore.signInErrorMessage = error.message;
    }
  }
  // const { key, error } = await nhost.auth.addSecurityKey();

  // // Something unexpected happened
  // if (error) {
  //   console.log(error);
  //   return;
  // }

  // // Successfully added a new security key
  // console.log(key.id);
  // try {
  //   await loginWithPasskey(email);
  //   console.log("ok");
  //   return;
  // } catch (error) {
  //   console.log(error);
  //   latestError = error;
  // }

  // try {
  //   await loginWithMagicLink(email);
  //   return;
  // } catch (error) {
  //   latestError = error;
  // }
  // if (password) {
  //   try {
  //     await loginWithPassword(email, password);
  //     const authStore = useAuthStore();
  //     authStore.signInErrorMessage = "";
  //     return;
  //   } catch (error) {
  //     const authStore = useAuthStore();
  //     authStore.signInErrorMessage = error.message;
  //   }
  // }

  // if (latestError) {
  //   const authStore = useAuthStore();
  //   authStore.signInErrorMessage = latestError.message;
  // }

  return;
};
