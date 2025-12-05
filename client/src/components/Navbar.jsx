import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-black text-white border-b border-white/10">
      <h1 className="text-2xl font-bold tracking-wide">
        MyApp
      </h1>

      <div className="flex items-center gap-3">
        <LoginButton />
        <SignupButton />
      </div>
    </nav>
  );
};

export default Navbar;
