import React, { useState } from "react";

const dummyProducts = [
  {
    id: 1,
    name: "Premium Hoodie",
    category: "Clothing",
    price: "₹1,999",
    stock: 12,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
  },
  {
    id: 2,
    name: "Running Sneakers",
    category: "Footwear",
    price: "₹2,999",
    stock: 5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
  },
  {
    id: 3,
    name: "Leather Wallet",
    category: "Accessories",
    price: "₹899",
    stock: 20,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=300",
  },
  {
    id: 4,
    name: "Denim Jacket",
    category: "Clothing",
    price: "₹2,499",
    stock: 3,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=300",
  },
];

const AdminProductList = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = dummyProducts;

  return (
    <div className="text-white">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Products</h1>
          <p className="text-zinc-400 text-sm">Manage your store products</p>
        </div>

        <button className="bg-white text-black text-sm px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition">
          + Add Product
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
        />

        <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600">
          <option>All Categories</option>
          <option>Clothing</option>
          <option>Footwear</option>
          <option>Accessories</option>
        </select>

        <select
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
        >
          <option value="all">All Stock</option>
          <option value="low">Low Stock (≤5)</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950 text-zinc-400">
            <tr>
              <th className="text-left px-6 py-3">Image</th>
              <th className="text-left px-6 py-3">Product</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Price</th>
              <th className="text-left px-6 py-3">Stock</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t border-zinc-800 hover:bg-zinc-800 transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4">
                  <div className="font-medium">{product.name}</div>
                </td>
                <td className="px-6 py-4 text-zinc-400">{product.category}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded ${{
                      true: ""
                    }}`}
                  >
                    {product.stock <= 5 ? (
                      <span className="text-red-400 font-medium">{product.stock} left</span>
                    ) : (
                      <span className="text-green-400">{product.stock}</span>
                    )}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-400 hover:text-blue-300 text-xs">
                    Edit
                  </button>
                  <button className="text-red-400 hover:text-red-300 text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm">{product.name}</h3>
              <span className="text-xs text-zinc-400">{product.category}</span>
            </div>

            <div className="flex items-center justify-between text-sm mb-3">
              <span>{product.price}</span>
              <span className="text-zinc-400">Stock: {product.stock}</span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-zinc-800 text-xs py-2 rounded hover:bg-zinc-700">
                Edit
              </button>
              <button className="flex-1 bg-red-500/20 text-red-400 text-xs py-2 rounded hover:bg-red-500/30">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminProductList;
