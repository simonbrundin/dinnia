export const signIn = async (email: string) => {
  console.log("Start signIn");

  const router = useRouter();
  const { error, session } = await nhost.auth.signIn({
    email,
    securityKey: true,
  });

  // Something unexpected happened, for instance, the user canceled the process
  if (error) {
    console.log(error);
    return;
  }

  if (!session) {
    // Something unexpected happened
    console.log(error);
    return;
  }

  // User is signed in
  console.log("Inloggad");

  router.push({ path: "/" });
};
