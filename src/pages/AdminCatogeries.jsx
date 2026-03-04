import React from "react";

const dummyCategories = [
  {
    id: 1,
    name: "Clothing",
    products: 24,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  },
  {
    id: 2,
    name: "Footwear",
    products: 12,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  },
  {
    id: 3,
    name: "Accessories",
    products: 18,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=400",
  },
  {
    id: 4,
    name: "Bags",
    products: 9,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400",
  },
];

const AdminCatogeries = () => {
  const totalCategories = dummyCategories.length;
  const activeCategories = dummyCategories.filter(c => c.status === "Active").length;
  const totalProducts = dummyCategories.reduce((acc, c) => acc + c.products, 0);

  return (
    <div className="text-white space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Category Management</h1>
          <p className="text-zinc-400 text-sm">
            Create, edit and organize product categories for your store
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-zinc-800 px-4 py-2 rounded-lg text-sm hover:bg-zinc-700">
            Import
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200">
            + Add Category
          </button>
        </div>
      </div>


      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Total Categories</p>
          <h2 className="text-2xl font-semibold mt-2">{totalCategories}</h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Active Categories</p>
          <h2 className="text-2xl font-semibold mt-2">{activeCategories}</h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Total Products</p>
          <h2 className="text-2xl font-semibold mt-2">{totalProducts}</h2>
        </div>

      </div>


      {/* Search + Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <input
          type="text"
          placeholder="Search categories"
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
        />

        <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>


      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {dummyCategories.map(cat => (
          <div
            key={cat.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition"
          >

            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 space-y-3">

              <div className="flex items-center justify-between">
                <h3 className="font-medium">{cat.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  cat.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {cat.status}
                </span>
              </div>

              <p className="text-xs text-zinc-400">
                {cat.products} products in this category
              </p>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-zinc-800 text-xs py-2 rounded hover:bg-zinc-700">
                  View
                </button>

                <button className="flex-1 bg-blue-500/20 text-blue-400 text-xs py-2 rounded hover:bg-blue-500/30">
                  Edit
                </button>

                <button className="flex-1 bg-red-500/20 text-red-400 text-xs py-2 rounded hover:bg-red-500/30">
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>


      {/* Bottom Table for detailed management */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="font-medium">All Categories</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-zinc-950 text-zinc-400">
            <tr>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Products</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyCategories.map(cat => (
              <tr
                key={cat.id}
                className="border-t border-zinc-800 hover:bg-zinc-800"
              >
                <td className="px-6 py-4 font-medium">{cat.name}</td>

                <td className="px-6 py-4 text-zinc-400">
                  {cat.products}
                </td>

                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded ${
                    cat.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {cat.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-400 text-xs hover:text-blue-300">
                    Edit
                  </button>

                  <button className="text-red-400 text-xs hover:text-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default AdminCatogeries;
