import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/dashboard`,
        // audience is optional here if already in Auth0Provider, 
        // but being explicit is okay:
        // audience: import.meta.env.VITE_INNODEV_AUTH0_AUDIENCE,
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 border border-white bg-white text-black font-semibold text-sm rounded-md hover:bg-black hover:text-white transition-colors duration-200"
    >
      Log In
    </button>
  );
};

export default LoginButton;
