import React from "react";

const reviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    text: "Absolutely love the quality. The delivery was super fast and everything feels premium.",
  },
  {
    id: 2,
    name: "Riya Mehta",
    text: "The discounts are crazy good and the UI is super smooth. Loved the experience.",
  },
  {
    id: 3,
    name: "Kabir Singh",
    text: "Customer support was quick and helpful. Definitely shopping again!",
  },
  {
    id: 4,
    name: "Ananya Verma",
    text: "The product quality exceeded my expectations. Highly recommended.",
  },
  {
    id: 5,
    name: "Vivaan Kapoor",
    text: "Checkout was seamless and the design feels very modern.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative w-full py-28 bg-black text-white overflow-hidden">
      
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Loved by Thousands of Customers
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Real feedback from real people who trust our brand.
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
                className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 mx-5 min-w-80 shadow-xl"
              >
                <p className="text-sm mb-4 text-gray-200">
                  "{review.text}"
                </p>
                <h4 className="font-semibold text-white">
                  — {review.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Reverse */}
        <div className="overflow-hidden relative">
          <div className="flex w-max animate-[scroll_60s_linear_infinite] [animation-direction:reverse]">
            {reviews.concat(reviews).map((review, index) => (
              <div
                key={`rev-${index}`}
                className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 mx-5 min-w-80 shadow-xl"
              >
                <p className="text-sm mb-4 text-gray-200">
                  "{review.text}"
                </p>
                <h4 className="font-semibold text-white">
                  — {review.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

      </div>


    </section>
  );
};

export default Testimonials;
