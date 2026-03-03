import React from "react";

const ShopHeader = () => {
  return (
    <section className="w-full mt-10 bg-zinc-950 text-white border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Breadcrumb */}
        <div className="text-sm text-zinc-400 mb-4">
          Home <span className="mx-2">/</span> Shop
        </div>

        {/* Title + Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Left Side */}
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              Explore Our Collection
            </h1>
            <p className="text-zinc-400 text-sm">
              Showing 24 of 120 products
            </p>
          </div>

          {/* Right Side - Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">Sort by:</span>
            <select className="bg-zinc-900 border border-zinc-700 text-sm px-4 py-2 rounded-md focus:outline-none focus:border-white transition">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Popularity</option>
            </select>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShopHeader;
