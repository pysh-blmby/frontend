import React from "react";

const dummyCategories = [
  {
    id: 1,
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=800",
  },
  {
    id: 2,
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800",
  },
  {
    id: 3,
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
  },
  {
    id: 4,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800",
  },
];

const Categories = () => {
  return (
    <section className="w-full py-16 bg-zinc-950">
      <div className="max-w-300 mx-auto px-5">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-3 text-white">
            Shop by Category
          </h2>
          <p className="text-gray-400 text-sm">
            Discover products tailored to your style and needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {dummyCategories.map((category) => (
            <div
              key={category.id}
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
