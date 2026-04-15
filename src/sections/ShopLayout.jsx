import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const ShopLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [pagination, setPagination] = useState(null);
  const [categories, setCategories] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest"
  });

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sort = searchParams.get("sort") || "";

    setFilters({
      search,
      category,
      minPrice,
      maxPrice,
      sort
    });

    const urlPage = parseInt(searchParams.get("page")) || 1;
    setPage(urlPage);
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.search.trim()) params.set("search", filters.search.trim());
    if (filters.category) params.set("category", filters.category);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.sort) params.set("sort", filters.sort);

    params.set("page", "1");
    params.set("limit", "12");

    setPage(1);
    setSearchParams(params);
  };

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3500";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories/get-categories`);
        const data = await res.json();

        if (data.success) {
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      try {
        const params = new URLSearchParams(searchParams);
        params.set("limit", 12);
        const res = await fetch(`${API_BASE}/products?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setProducts(data.products || []);
          setPagination(data.pagination || null);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("limit", "12");
    setSearchParams(params, { replace: true });
  }, [page]);

  return (
    <section className="w-full bg-neutral-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Shop</h1>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-4 py-2 bg-neutral-900 border border-white/10 rounded-lg"
          >
            Filters
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:grid grid-cols-6 gap-4 mb-10 items-end">

          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2 outline-none"
          />

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2"
          />

          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="bg-neutral-900 border border-white/10 rounded-lg px-4 py-2"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price Low → High</option>
            <option value="price_desc">Price High → Low</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={applyFilters}
              className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-lg font-medium"
            >
              Apply
            </button>

            <button
              onClick={() => {
                setFilters({ search: "", category: "", minPrice: "", maxPrice: "", sort: "newest" });
                const params = new URLSearchParams();
                params.set("page", "1");
                params.set("limit", "12");
                setSearchParams(params);
              }}
              className="bg-neutral-800 hover:bg-neutral-700 transition px-4 py-2 rounded-lg border border-white/10"
            >
              Clear
            </button>
          </div>

        </div>

        {/* Mobile Filters Drawer */}
        {showFilters && (
          <div className="md:hidden bg-neutral-900 border border-white/10 rounded-xl p-5 mb-6 space-y-5 shadow-xl">

            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2"
            />

            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2"
              />

              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2"
              />
            </div>

            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-2"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price Low → High</option>
              <option value="price_desc">Price High → Low</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={applyFilters}
                className="flex-1 bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-lg font-medium"
              >
                Apply Filters
              </button>

              <button
                onClick={() => {
                  setFilters({ search: "", category: "", minPrice: "", maxPrice: "", sort: "newest" });
                  const params = new URLSearchParams();
                  params.set("page", "1");
                  params.set("limit", "12");
                  setSearchParams(params);
                }}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 border border-white/10 rounded-lg"
              >
                Clear
              </button>
            </div>

          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-neutral-900 rounded-xl border border-white/10 overflow-hidden animate-pulse">
                <div className="aspect-square bg-neutral-800"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-neutral-800 rounded"></div>
                  <div className="h-4 bg-neutral-800 rounded w-2/3"></div>
                  <div className="h-6 bg-neutral-800 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 border border-white/10 rounded-xl bg-neutral-900/40">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-white/60 max-w-md mb-6">
              We couldn't find any products matching your filters. Try adjusting your search or clearing the filters.
            </p>

            <button
              onClick={() => {
                setFilters({ search: "", category: "", minPrice: "", maxPrice: "", sort: "newest" });
                const params = new URLSearchParams();
                params.set("page", "1");
                params.set("limit", "12");
                setSearchParams(params);
              }}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`} className="block">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group bg-neutral-900 rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-purple-400">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      {product.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">${product.discountPrice}</span>
                          <span className="text-sm text-white/40 line-through">${product.price}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">${product.price}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}

        {pagination && (
          <div className="flex items-center justify-center gap-4 mt-10">

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-neutral-900 border border-white/10 rounded-lg disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-sm text-white/70">
              Page {pagination.page || pagination.currentPage || page} of {pagination.totalPages || pagination.pages}
            </span>

            <button
              disabled={page === (pagination.totalPages || pagination.pages)}
              onClick={() => setPage((p) => Math.min(p + 1, (pagination.totalPages || pagination.pages)))}
              className="px-4 py-2 bg-neutral-900 border border-white/10 rounded-lg disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </section>
  );
};

export default ShopLayout;