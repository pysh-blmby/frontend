import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminProductList = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [stockFilter, setStockFilter] = useState(searchParams.get("stock") || "all");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", page);
        params.set("limit", 12);

        if (search) params.set("search", search);
        if (categoryFilter !== "all") params.set("category", categoryFilter);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (sort) params.set("sort", sort);
        if (stockFilter !== "all") params.set("stock", stockFilter);

        const res = await fetch(`${API_BASE}/admin/get-products?${params.toString()}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
          setTotalPages(1);
        } else if (data.products) {
          setProducts(data.products);
          setTotalPages(data.pagination?.totalPages || data.totalPages || 1);
        } else {
          console.warn("Unexpected response:", data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories/get-categories`);
        const data = await res.json();

        if (data.success) {
          setCategories(data.categories || []);
        } else {
          console.warn("Unexpected categories response:", data);
          setCategories([]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [search, categoryFilter, minPrice, maxPrice, sort, stockFilter, page]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (categoryFilter !== "all") params.set("category", categoryFilter);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sort) params.set("sort", sort);
    if (stockFilter !== "all") params.set("stock", stockFilter);
    params.set("page", page);
    params.set("limit", 12);

    setSearchParams(params);
  }, [search, categoryFilter, minPrice, maxPrice, sort, stockFilter, page]);

  const filteredProducts = products;

  return (
    <section className="w-full text-white space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-semibold">Product Management</h1>
          <p className="text-zinc-400 text-sm">View, edit and manage store products</p>
        </div>

        <button
          onClick={() => navigate("/admin/product")}
          className="bg-white text-black text-sm px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition"
        >
          + Add Product
        </button>
      </div>


      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 pt-2">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:border-zinc-600"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price Low → High</option>
          <option value="price_desc">Price High → Low</option>
          <option value="stock_desc">Stock High → Low</option>
        </select>

        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none"
        >
          <option value="all">All Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
          <option value="in">In Stock</option>
        </select>

      </div>


      {/* Loading */}
      {loading && (
        <div className="text-zinc-400 text-sm">Loading products...</div>
      )}


      {/* Product Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">

          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all duration-300"
            >

              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>


              {/* Product Info */}
              <div className="p-4 space-y-3">

                <div>
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-xs text-zinc-400">
                    {product.category?.name || product.category}
                  </p>
                </div>


                <div className="flex items-center justify-between">
                  <span className="font-semibold">₹{product.price}</span>

                  {product.stock <= 5 ? (
                    <span className="text-xs text-red-400 font-medium">
                      {product.stock} left
                    </span>
                  ) : (
                    <span className="text-xs text-green-400">
                      {product.stock} in stock
                    </span>
                  )}
                </div>


                {/* Admin Actions */}
                <div className="flex gap-2">

                  <button
                    onClick={() => navigate(`/admin/product/${product._id}`)}
                    className="flex-1 bg-zinc-800 text-xs py-2 rounded hover:bg-zinc-700"
                  >
                    Edit
                  </button>

                  <button
                    className="flex-1 bg-red-500/20 text-red-400 text-xs py-2 rounded hover:bg-red-500/30"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}


          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center text-center border border-zinc-800 rounded-xl bg-zinc-900/40 py-16 space-y-3">
              <div className="text-5xl">📦</div>
              <h2 className="text-lg font-semibold">No products found</h2>
              <p className="text-zinc-400 text-sm">
                Try adjusting your filters or create a new product.
              </p>

              <button
                onClick={() => navigate("/admin/product")}
                className="bg-white text-black px-5 py-2 rounded-lg text-sm hover:bg-zinc-200 transition"
              >
                Add Product
              </button>
            </div>
          )}

        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">

        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm text-zinc-400">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </section>
  );
};

export default AdminProductList;
