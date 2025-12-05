const HeroSection = () => {
  return (
    <section className="min-h-[80vh] w-full bg-black text-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
        Welcome to My App
      </h1>
      <p className="text-base md:text-lg text-white/70 max-w-xl">
        A clean black and white landing page with simple authentication controls.
      </p>
    </section>
  );
};

export default HeroSection;
