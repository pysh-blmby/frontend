import React from "react";

const Categories = ({ categoriesData }) => {
  const categories = categoriesData?.categories || [];
  
  return (
    <section className="w-full py-16 bg-zinc-950">
      <div className="max-w-300 mx-auto px-5">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3 text-white">
            {categoriesData?.title}
          </h2>
          <p className="text-gray-400 text-sm">
            Discover products tailored to your style and needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-zinc-900"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-65 object-cover transform group-hover:scale-105 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-white text-xl font-medium tracking-wide">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;
