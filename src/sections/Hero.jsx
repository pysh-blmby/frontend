import React, { useEffect, useState } from "react";

const Hero = ({ heroData }) => {
  const [current, setCurrent] = useState(0);
  const images = heroData?.images || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (images.length ? (prev + 1) % images.length : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full mt-10 h-[70vh] overflow-hidden">
      {/* Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-20" />

      {/* Center Text */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {heroData?.title}
        </h1>
        <p className="text-lg md:text-xl mb-6">
          {heroData?.subtitle}
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300">
          {heroData?.buttonText}
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
