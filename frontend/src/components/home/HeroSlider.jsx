import { useEffect, useState } from "react";

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
    <>
      {/* Banner Image */}

      <img
        src={banners[currentBanner]}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/50"></div>

      {/* Left Arrow */}

      <button
        onClick={() =>
          setCurrentBanner(
            currentBanner === 0
              ? banners.length - 1
              : currentBanner - 1
          )
        }
       className="absolute left-2 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg text-lg sm:text-xl md:text-2xl"
      >
        ❮
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
       className="absolute right-2 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg text-lg sm:text-xl md:text-2xl"
      >
        ❯
      </button>

      {/* Dots */}

      <div className="absolute bottom-3 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`transition-all rounded-full ${
              currentBanner === index
  ? "bg-white w-6 sm:w-8 h-2 sm:h-3"
  : "bg-gray-300 w-2 h-2 sm:w-3 sm:h-3"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export default HeroSlider;