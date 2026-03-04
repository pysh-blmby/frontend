import React from "react";

const AdminProduct = () => {
  return (
    <div className="text-white max-w-4xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold">Add Product</h1>
        <p className="text-zinc-400 text-sm">
          Create a new product for your store
        </p>
      </div>

      <form className="space-y-6">

        {/* Product Image Upload */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Product Images
          </label>

          <div className="border border-dashed border-zinc-700 rounded-xl p-6 text-center bg-zinc-900">
            <p className="text-sm text-zinc-400">
              Drag & drop images or click to upload
            </p>
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Description
          </label>

          <textarea
            rows="4"
            placeholder="Write product description"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Price
            </label>
            <input
              type="number"
              placeholder="₹ Price"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Stock
            </label>
            <input
              type="number"
              placeholder="Available stock"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Category
          </label>

          <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm">
            <option>Select category</option>
            <option>Clothing</option>
            <option>Footwear</option>
            <option>Accessories</option>
          </select>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
          <div>
            <p className="text-sm">Featured Product</p>
            <p className="text-xs text-zinc-400">
              Show this product on homepage
            </p>
          </div>

          <input type="checkbox" className="accent-white" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition"
          >
            Save Product
          </button>

          <button
            type="button"
            className="bg-zinc-800 px-5 py-2 rounded-lg text-sm hover:bg-zinc-700 transition"
          >
            Cancel
          </button>
        </div>

      </form>

    </div>
  );
};

export default AdminProduct;
