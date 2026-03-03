import React from "react";
import { Link } from "react-router-dom";

const dummyProducts = [
  {
    id: 1,
    name: "Black Oversized Hoodie",
    price: 1499,
    category: "Men",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Classic White Sneakers",
    price: 2999,
    category: "Men",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Minimal Leather Wallet",
    price: 999,
    category: "Accessories",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Sport Running Shoes",
    price: 3499,
    category: "Men",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Premium Cotton T-Shirt",
    price: 799,
    category: "Women",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Slim Fit Denim Jacket",
    price: 2599,
    category: "Women",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
  },
];

const ShopLayout = () => {
  return (
    <section className="w-full bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 sticky top-24">
              
              <h3 className="text-lg font-semibold mb-6">Filters</h3>

              {/* Category */}
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-4 text-zinc-400">Category</h4>
                <div className="space-y-3 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-white" /> Men
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-white" /> Women
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-white" /> Accessories
                  </label>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-4 text-zinc-400">Price Range</h4>
                <input type="range" className="w-full" />
                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                  <span>₹0</span>
                  <span>₹5000</span>
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-4 text-zinc-400">Size</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-3 py-1 border border-zinc-700 rounded-md text-xs hover:border-white transition">S</button>
                  <button className="px-3 py-1 border border-zinc-700 rounded-md text-xs hover:border-white transition">M</button>
                  <button className="px-3 py-1 border border-zinc-700 rounded-md text-xs hover:border-white transition">L</button>
                  <button className="px-3 py-1 border border-zinc-700 rounded-md text-xs hover:border-white transition">XL</button>
                </div>
              </div>

              <button className="w-full mt-4 py-2 text-sm border border-zinc-700 rounded-md hover:border-white transition">
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyProducts.map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-white transition-all duration-300 hover:-translate-y-1 block"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur px-3 py-1 text-xs rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-semibold mb-1 group-hover:text-zinc-300 transition">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <p className="text-white font-medium">
                        ₹{product.price}
                      </p>
                      <span className="text-xs text-yellow-400">
                        ⭐ {product.rating}
                      </span>
                    </div>

                    <button className="w-full py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition">
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShopLayout;
