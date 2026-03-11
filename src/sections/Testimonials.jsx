import React from "react";

const Testimonials = ({ testimonialsData }) => {
  if (!testimonialsData?.enabled) return null;
  const reviews = testimonialsData?.reviews || [];

  return (
    <section className="relative w-full py-28 bg-black text-white overflow-hidden">
      
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          {testimonialsData?.title}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
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
                key={review._id || index}
                className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 mx-5 min-w-80 shadow-xl"
              >
                <p className="text-sm mb-4 text-gray-200">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white">
                    — {review.name}
                  </h4>
                  <div className="flex ml-3">
                    {Array.from({ length: review.rating || 0 }).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
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
                key={review._id || `rev-${index}`}
                className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 mx-5 min-w-80 shadow-xl"
              >
                <p className="text-sm mb-4 text-gray-200">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white">
                    — {review.name}
                  </h4>
                  <div className="flex ml-3">
                    {Array.from({ length: review.rating || 0 }).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
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
