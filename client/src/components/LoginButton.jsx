import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="
        px-5 py-3
        rounded-full
        text-sm
        font-medium
        text-white/85
        border border-white/15
        bg-white/5
        backdrop-blur-md
        hover:bg-white/10 hover:text-white
        transition-all duration-200
        shadow-[0_0_8px_rgba(255,255,255,0.04)]
      "
    >
      Log In
    </button>
  );
};

export default LoginButton;
