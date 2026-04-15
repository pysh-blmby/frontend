import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories/get-categories`);
        const data = await res.json();

        if (data.success) {
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-8">All Categories</h1>
        <p className="text-zinc-400">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-10">All Categories</h1>

      {categories.length === 0 ? (
        <p className="text-zinc-400">No categories found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/shop?category=${category._id}&page=1&limit=12`}
              className="group border border-zinc-800 rounded-xl overflow-hidden hover:border-white/40 transition"
            >
              <div className="aspect-square bg-zinc-900 flex items-center justify-center">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <span className="text-zinc-500 text-sm">No Image</span>
                )}
              </div>

              <div className="p-3 text-center">
                <h3 className="font-medium group-hover:text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCategory;
