import HeroSlider from "./HeroSlider";

function HeroSection() {
  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] overflow-hidden">
      <HeroSlider />
    </section>
  );
}

export default HeroSection;