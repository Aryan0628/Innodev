import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/dashboard`,
        screen_hint: "signup", // 👈 tells Auth0 to open signup
        // audience: import.meta.env.VITE_INNODEV_AUTH0_AUDIENCE,
      },
    });
  };

  return (
    <button
      onClick={handleSignUp}
      className="px-4 py-2 border border-white bg-black text-white font-semibold text-sm rounded-md hover:bg-white hover:text-black transition-colors duration-200"
    >
      Sign Up
    </button>
  );
};

export default SignupButton;
