import React from "react";

const dummyProducts = [
  {
    id: 1,
    name: "Classic Black Hoodie",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
  },
  {
    id: 2,
    name: "Minimal White Sneakers",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
  },
  {
    id: 3,
    name: "Leather Handbag",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800",
  },
  {
    id: 4,
    name: "Smart Casual Watch",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="w-full py-20 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Featured Products
          </h2>
          <p className="text-zinc-400 text-sm">
            Handpicked essentials curated just for you
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 rounded-xl overflow-hidden group cursor-pointer"
            >
              {/* Product Image */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-medium mb-2">
                  {product.name}
                </h3>
                <p className="text-zinc-400 mb-4">
                  ₹{product.price}
                </p>

                <button className="w-full bg-white text-black py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
