import React from "react";

const Stars = ({ value = 5 }) => {
  return (
    <div className="flex gap-1 text-yellow-400 text-sm">
      {Array.from({ length: value }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
};

const Testimonials = ({ testimonialsData }) => {
  if (!testimonialsData?.enabled) return null;
  const reviews = testimonialsData?.reviews || [];
  
  if (reviews.length === 0) return null;

  return (
    <section className="relative w-full py-28 bg-linear-to-b from-black to-zinc-950 text-white overflow-hidden">
      
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white via-white to-zinc-400">
          {testimonialsData?.title}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {testimonialsData?.subtitle}
        </p>
      </div>

      {/* Sliding Rows */}
      <div className="space-y-10">

        {/* Row 1 */}
        <div className="overflow-hidden relative">
          <div className="flex w-max animate-[scroll_60s_linear_infinite]">
            {reviews.concat(reviews).map((review, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl px-8 py-6 mx-5 min-w-80 shadow-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
              >
                {/* Stars */}
                <div className="flex mb-4">
                  <Stars value={review.rating || 5} />
                </div>

                {/* Review Text */}
                <p className="text-sm mb-4 text-gray-200 leading-relaxed italic">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {review.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Reverse */}
        <div className="overflow-hidden relative">
          <div className="flex w-max animate-[scroll_60s_linear_infinite] [animation-direction:reverse]">
            {reviews.concat(reviews).map((review, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl px-8 py-6 mx-5 min-w-80 shadow-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
              >
                {/* Stars */}
                <div className="flex mb-4">
                  <Stars value={review.rating || 5} />
                </div>

                {/* Review Text */}
                <p className="text-sm mb-4 text-gray-200 leading-relaxed italic">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {review.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

export default Testimonials;
