import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Hero() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
    });
  };
  return (
    <section className="relative flex min-h-screen items-center justify-center pt-24">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-4xl px-6 text-center transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {/* Badge with green dot */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm px-5 py-2 text-xs tracking-[0.15em] uppercase text-white shadow-lg shadow-black/20">
          SYNTHETIC SOCIETY SIMULATOR
          <span className="h-2 w-2 rounded-full bg-[oklch(0.75_0.18_165)] shadow-[0_0_8px_oklch(0.75_0.18_165)]" />
        </div>

        {/* Main heading */}
        <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-8xl drop-shadow-lg">
          Civora
        </h1>

        {/* Subheading */}
        <p className="mb-4 text-xl text-white md:text-2xl font-light">
          A synthetic society where decisions come to life.
        </p>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg font-light leading-relaxed">
          Simulate policies, watch virtual citizens react, and uncover hidden
          consequences before your choices ever reach the real world.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-10">
          <Button
            size="lg"
            className="gap-2 bg-[oklch(0.75_0.18_165)] text-black hover:bg-[oklch(0.78_0.18_165)] shadow-lg shadow-[oklch(0.75_0.18_165)]/20"
            onClick={handleLogin}
          >
            Launch Simulation
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Subtle glow effects */}
      <div className="absolute bottom-20 left-10 h-32 w-32 rounded-full bg-[oklch(0.75_0.18_165)]/10 blur-3xl" />
      <div className="absolute right-10 top-40 h-40 w-40 rounded-full bg-[oklch(0.75_0.18_165)]/10 blur-3xl" />
    </section>
  );
}
