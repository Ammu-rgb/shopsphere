import HeroSlider from "./HeroSlider";

function HeroSection() {
  return (
    <section
      className="
        relative
        w-full
        h-[32vh]
        sm:h-[42vh]
        md:h-[58vh]
        lg:h-[75vh]
        xl:h-[85vh]
        overflow-hidden
      "
    >
      <HeroSlider />
    </section>
  );
}

export default HeroSection;