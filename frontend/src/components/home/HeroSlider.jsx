import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function HeroSlider() {
  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
    "/images/banner4.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Banner */}
      <img
        src={banners[currentBanner]}
        alt={`Banner ${currentBanner + 1}`}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Left Arrow */}
      <button
        onClick={() =>
          setCurrentBanner(
            currentBanner === 0
              ? banners.length - 1
              : currentBanner - 1
          )
        }
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition"
      >
        <FaChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() =>
          setCurrentBanner(
            currentBanner === banners.length - 1
              ? 0
              : currentBanner + 1
          )
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`rounded-full transition-all duration-300 ${
              currentBanner === index
                ? "bg-white w-8 h-2"
                : "bg-white/60 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;