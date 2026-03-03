import React from "react";

const Promo = () => {
  return (
    <section className="relative w-full py-24 overflow-hidden text-white">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000')",
        }}
      />

      {/* Colorful Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-purple-900/80 via-pink-800/70 to-orange-600/70" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        
        {/* Offer Badge */}
        <div className="inline-block mb-6 px-5 py-2 text-sm bg-white text-black rounded-full font-semibold shadow-lg">
          Limited Time Offer
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          🔥 Summer Sale — Up to 40% Off
        </h2>

        {/* Sub Text */}
        <p className="text-gray-200 max-w-2xl mx-auto mb-10 text-base md:text-lg">
          Grab your favorite products at unbeatable prices. 
          Shop now before the offer ends and enjoy exclusive discounts.
        </p>

        {/* CTA Button */}
        <button className="bg-white text-black px-10 py-3 rounded-md text-sm font-semibold hover:bg-gray-200 transition shadow-xl">
          Shop Now
        </button>

      </div>
    </section>
  );
};

export default Promo;
