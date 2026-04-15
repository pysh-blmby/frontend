import React from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  if (!products?.enabled) return null;
  const productList = products?.products || [];

  return (
    <section className="w-full py-20 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            {products?.title}
          </h2>
          <p className="text-zinc-400 text-sm">
            Handpicked curated just for you
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {productList.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-zinc-900 rounded-xl overflow-hidden group cursor-pointer block"
            >
              {/* Product Image */}
              <div className="overflow-hidden">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-medium mb-2">
                  {product.title}
                </h3>
                <p className="text-zinc-400 mb-4">
                  ₹{product.price}
                </p>

                <button className="w-full bg-white text-black py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
