const router = useRouter();

export const signUp = async (email: string) => {
  console.log("Start signUp");

  const { error, session } = await nhost.auth.signUp({
    email,
    securityKey: true,
  });
  // Om redan inloggad
  if (error?.status === 20) {
    navigateTo("/");
    console.log("yeah");
    return;
  }

  // Om emailadressen redan används => Logga in istället
  if (error?.status === 409) {
    signIn(email);
    return;
  }
  // Something unexpected happened, for instance, the user canceled the process
  if (error) {
    console.log(error);
    alert(error.message);

    return;
  }

  // if there is no error and no session, the user needs to verify their email address.
  if (!session) {
    const message: string =
      "You need to verify your email address by clicking the link in the email we sent you.";
    console.log(message);
    alert(message);
    router.push({ path: "/" });
    return;
  }

  //Sign-up is complete!
  console.log(session.user);
  navigateTo("/");
};
