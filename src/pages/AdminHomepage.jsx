import React, { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminHomepage() {
  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedHeroFiles, setSelectedHeroFiles] = useState([]);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryUploading, setCategoryUploading] = useState(false);
  const [selectedCategoryFile, setSelectedCategoryFile] = useState(null);
  const [selectedPromoFile, setSelectedPromoFile] = useState(null);
  const [promoUploading, setPromoUploading] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState(null);
  const [testimonialDraft, setTestimonialDraft] = useState({
    name: "",
    text: "",
    rating: 5,
  });
  const [allCategories, setAllCategories] = useState([]);
  const [featuredCategory, setFeaturedCategory] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // --- Removed category helper functions for UI-only editing ---
  const uploadCategoryImage = async (file) => {
    try {
      setCategoryUploading(true);

      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.urls?.length) {
        return data.urls[0];
      } else {
        console.error("Category image upload failed:", data);
        alert("Image upload failed");
        return null;
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading the image");
      return null;
    } finally {
      setCategoryUploading(false);
    }
  };
  const uploadPromoImage = async (file) => {
    try {
      setPromoUploading(true);

      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.urls?.length) {
        const url = data.urls[0];
        updateField("promo", "backgroundImage", url);
        setSelectedPromoFile(null);
        return url;
      } else {
        console.error("Promo image upload failed:", data);
        alert("Promo image upload failed");
        return null;
      }
    } catch (err) {
      console.error("Promo upload error:", err);
      alert("Something went wrong while uploading the promo image");
      return null;
    } finally {
      setPromoUploading(false);
    }
  };

const uploadHeroImages = async () => {
    if (!selectedHeroFiles.length) {
      console.warn("No files selected for upload");
      return;
    }

    try {
      const formData = new FormData();

      selectedHeroFiles.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const cleanedExisting = (homepage.hero.images || []).map((url) =>
          url.trim(),
        );
        const cleanedNew = (data.urls || []).map((url) => url.trim());

        const newImages = [...cleanedExisting, ...cleanedNew];

        updateField("hero", "images", newImages);

        setSelectedHeroFiles([]);

        console.log("Upload successful:", data.urls);
      } else {
        console.error("Upload failed:", data);
        alert("Image upload failed. Check server logs.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading images.");
    }
  };

  const fetchHomepage = async () => {
    try {
      const res = await fetch(`${API_BASE}/homepage`);
      const data = await res.json();
      setHomepage(data);

      // Fetch all categories
      const catRes = await fetch(`${API_BASE}/categories/get-categories`);
      const catData = await catRes.json();
      if (catData.success) {
        setAllCategories(catData.categories || []);
      }
    } catch (err) {
      console.error("Failed to load homepage", err);
    } finally {
      setLoading(false)
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    if (!categoryId) return;

    try {
      setLoadingProducts(true);

      const res = await fetch(`${API_BASE}/products/get-products?category=${categoryId}&limit=100`);
      const data = await res.json();

      if (res.ok && data.products) {
        setFetchedProducts(data.products);
        setSelectedProducts([]);
      }
    } catch (err) {
      console.error("Failed to fetch products for category", err);
    } finally {
      setLoadingProducts(false);
    }
  };


  useEffect(() => {
    fetchHomepage();
  }, []);

  const updateHomepage = async () => {
    try {
      console.log(homepage.hero.images);
      // Only send category and product IDs to backend
      const cleanedHomepage = {
        ...homepage,
        categoriesSection: {
          ...homepage.categoriesSection,
          categories: (homepage.categoriesSection?.categories || []).map((c) =>
            typeof c === "string" ? c : c._id
          ),
        },
        featuredProducts: {
          ...homepage.featuredProducts,
          products: (homepage.featuredProducts?.products || []).map((p) =>
            typeof p === "string" ? p : p._id
          ),
        },
      };
      const res = await fetch(`${API_BASE}/homepage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedHomepage),
      });

      console.log(res);

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error("Homepage update failed with status:", res.status);
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const updateField = (section, field, value) => {
    setHomepage((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (loading || !homepage) {
    return <div className="p-8 text-white">Loading homepage data...</div>;
  }
  return (
    <div className="p-4 md:p-8 text-white max-w-6xl mx-auto space-y-8 relative">
      {showSuccess && (
        <div className="fixed top-4 right-4 left-4 md:left-auto bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm text-center">
          Homepage updated successfully
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Homepage Editor
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage the sections that appear on your storefront homepage.
          </p>
        </div>

        <button
          onClick={updateHomepage}
          className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-lg text-sm font-medium"
        >
          Save Changes
        </button>
      </div>

      {/* HERO SECTION */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 shadow-lg">
        <h2 className="text-lg font-semibold">Hero Section</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={homepage.hero.title || ""}
            onChange={(e) => updateField("hero", "title", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />

          <input
            value={homepage.hero.subtitle || ""}
            onChange={(e) => updateField("hero", "subtitle", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />

          <input
            value={homepage.hero.buttonText || ""}
            onChange={(e) => updateField("hero", "buttonText", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />

          <input
            value={homepage.hero.buttonLink || ""}
            onChange={(e) => updateField("hero", "buttonLink", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />
        </div>

        <div className="space-y-6">
          {/* Existing Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(homepage.hero.images || []).map((img, index) => (
              <div
                key={index}
                className="relative group rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-700 shadow-md hover:shadow-xl transition"
              >
                <img
                  src={img}
                  alt="hero"
                  className="w-full h-56 md:h-64 object-cover"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>

                <button
                  onClick={() => {
                    const newImages = homepage.hero.images.filter(
                      (_, i) => i !== index,
                    );
                    updateField("hero", "images", newImages);
                  }}
                  className="absolute top-3 right-3 bg-black/70 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Image URL */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste image URL..."
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  const newImages = [
                    ...(homepage.hero.images || []),
                    e.target.value.trim(),
                  ];
                  updateField("hero", "images", newImages);
                  e.target.value = "";
                }
              }}
            />

            <button
              onClick={(e) => {
                const input = e.currentTarget.previousSibling;
                if (input.value.trim()) {
                  const newImages = [
                    ...(homepage.hero.images || []),
                    input.value.trim(),
                  ];
                  updateField("hero", "images", newImages);
                  input.value = "";
                }
              }}
              className="bg-neutral-700 hover:bg-neutral-600 px-3 rounded-lg text-sm"
            >
              Add
            </button>
          </div>

          {/* Upload Images */}
          <div className="space-y-3">
            <label
              htmlFor="upload-hero-images"
              className="border border-dashed border-neutral-700 rounded-xl p-6 bg-neutral-800/40 flex flex-col items-center justify-center gap-4 hover:border-purple-500 transition cursor-pointer"
            >
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-200">
                  Upload Hero Images
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Select one or multiple images for the hero section
                </p>
              </div>
            </label>

            <input
              id="upload-hero-images"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setSelectedHeroFiles(files);
              }}
            />

            {selectedHeroFiles.length > 0 && (
              <div className="border border-neutral-700 rounded-lg p-3 bg-neutral-800 space-y-1">
                <p className="text-xs text-neutral-400 mb-1">Selected files:</p>
                {selectedHeroFiles.map((file, index) => (
                  <div
                    key={index}
                    className="text-sm text-neutral-200 truncate"
                  >
                    {file.name}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={uploadHeroImages}
                  className="mt-3 w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 hover:bg-purple-700 transition shadow-md"
                >
                  Upload Selected Files
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Categories Section</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={homepage.categoriesSection?.enabled ?? true}
              onChange={(e) => updateField("categoriesSection", "enabled", e.target.checked)}
              className="accent-purple-600"
            />
            Enabled
          </label>
        </div>

        <input
          value={homepage.categoriesSection?.title || ""}
          onChange={(e) => updateField("categoriesSection", "title", e.target.value)}
          placeholder="Section Title"
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
        />

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-neutral-300">Selected Categories</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(homepage.categoriesSection?.categories || []).map((catId, index) => {
              const category =
                typeof catId === "string"
                  ? allCategories.find((c) => c._id === catId)
                  : catId;
              const categoryId = category?._id || catId;
              return (
                <div
                  key={categoryId}
                  className="relative h-32 rounded-xl overflow-hidden group border border-neutral-700 bg-neutral-900 shadow-md"
                >
                  {category?.image ? (
                    <img
                      src={category.image}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-400 text-xs">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium text-center px-2">
                      {category?.name || "Unknown"}
                    </span>
                  </div>

                  <button
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded transition"
                    onClick={() => {
                      const updated = (homepage.categoriesSection?.categories || []).filter(
                        (id) => (typeof id === "string" ? id : id._id) !== categoryId
                      );
                      updateField("categoriesSection", "categories", updated);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="border border-dashed border-neutral-700 rounded-lg p-4 space-y-3">
            <button
              onClick={() => setShowCategoryPicker((prev) => !prev)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
            >
              {showCategoryPicker ? "Close Category List" : "Add Category"}
            </button>

            {showCategoryPicker && (
              <div className="mt-4 border border-neutral-700 rounded-xl bg-neutral-900 p-3 max-h-72 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allCategories
                    .filter(cat =>
                      !(homepage.categoriesSection?.categories || []).some(
                        (c) => (typeof c === "string" ? c : c._id) === cat._id
                      )
                    )
                    .map((category) => (
                      <button
                        key={category._id}
                        onClick={() => {
                          const existing = homepage.categoriesSection?.categories || [];
                          const updated = [
                            ...existing.map((c) => (typeof c === "string" ? c : c._id)),
                            category._id,
                          ];
                          updateField("categoriesSection", "categories", updated);
                          setShowCategoryPicker(false);
                        }}
                        className="group relative h-24 rounded-xl border border-neutral-700 bg-neutral-800 hover:border-purple-500 hover:shadow-lg transition flex flex-col items-center justify-center overflow-hidden"
                      >
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 bg-neutral-800">
                            No Image
                          </div>
                        )}
                        <span className="relative z-10 text-xs font-medium text-white bg-black/60 px-2 py-1 rounded">
                          {category.name}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 shadow-lg">
        <h2 className="text-lg font-semibold">Featured Products</h2>

        <input
          value={homepage.featuredProducts.title || ""}
          onChange={(e) =>
            updateField("featuredProducts", "title", e.target.value)
          }
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
        />

        <div className="space-y-4">

          <div className="flex gap-3 items-center mb-2">
            <select
              value={featuredCategory}
              onChange={(e) => setFeaturedCategory(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select Category</option>
              {allCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => fetchProductsByCategory(featuredCategory)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
              disabled={!featuredCategory || loadingProducts}
            >
              {loadingProducts ? "Loading..." : "Load Products"}
            </button>
          </div>

          <div className="text-xs text-neutral-400">
            Select products from the fetched list to add them to featured products.
          </div>

          <div className="space-y-2">
            <div className="text-sm text-neutral-400">
              Selected Featured Products
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(homepage.featuredProducts.products || []).map((prodId) => {
                const product = prodId;
                const id = product?._id;

                // Show a placeholder if no product
                if (!product) {
                  return (
                    <div
                      key={id}
                      className="border border-dashed border-neutral-700 rounded-xl h-32 flex items-center justify-center text-xs text-neutral-400"
                    >
                      Load category to preview
                    </div>
                  );
                }

                // If no product found, skip rendering it
                if (!product) return null;

                return (
                  <div
                    key={product?._id || id}
                    className="relative border border-neutral-700 rounded-xl overflow-hidden bg-neutral-800 group"
                  >
                    {product?.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 flex items-center justify-center text-xs text-neutral-400">
                        No Image
                      </div>
                    )}

                    <div className="p-2 text-xs truncate">
                      {product?.title || "Product"}
                    </div>

                    <button
                      onClick={() => {
                        const updated = (homepage.featuredProducts.products || []).filter(
                          (idItem) =>
                            (idItem._id !== (product?._id || id))
                        );

                        updateField("featuredProducts", "products", updated);
                      }}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {fetchedProducts.length > 0 && (
            <div className="space-y-3 mt-6">
              <div className="h-px bg-neutral-800" />
              <div className="text-sm text-neutral-400">
                Loaded Products
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-80 overflow-y-auto">
                {fetchedProducts.map((product) => {
                  const isChecked =
                    selectedProducts.includes(product._id) ||
                    (homepage.featuredProducts.products || []).some(
                      (p) => p._id === product._id
                    );

                  return (
                    <label
                      key={product._id}
                      className={`relative border rounded-xl overflow-hidden cursor-pointer transition ${
                        isChecked
                          ? "border-purple-500 ring-2 ring-purple-500"
                          : "border-neutral-700 hover:border-purple-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts((prev) => [...prev, product._id]);
                          } else {
                            setSelectedProducts((prev) =>
                              prev.filter((id) => id !== product._id)
                            );
                          }
                        }}
                        className="absolute top-2 left-2 z-10 accent-purple-600"
                      />

                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center text-xs text-neutral-400 bg-neutral-800">
                          No Image
                        </div>
                      )}

                      <div className="p-2 text-xs text-white truncate">
                        {product.title}
                      </div>
                    </label>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  const existing = homepage.featuredProducts.products || [];
                  const newProducts = fetchedProducts.filter((p) =>
                    selectedProducts.includes(p._id)
                  );

                  const merged = [
                    ...existing,
                    ...newProducts.filter(
                      (np) => !existing.some((ep) => ep._id === np._id)
                    ),
                  ];

                  setHomepage((prev) => ({
                    ...prev,
                    featuredProducts: {
                      ...prev.featuredProducts,
                      products: merged,
                    },
                  }));

                  setSelectedProducts([]);
                }}
                disabled={selectedProducts.length === 0}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg text-sm"
              >
                Add to Featured
              </button>
            </div>
          )}

        </div>
      </div>

      {/* PROMO BANNER */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 shadow-lg">
        <h2 className="text-lg font-semibold">Promo Banner</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={homepage.promo.title || ""}
            onChange={(e) => updateField("promo", "title", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />

          <input
            value={homepage.promo.subtitle || ""}
            onChange={(e) => updateField("promo", "subtitle", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />

          <input
            value={homepage.promo.buttonLink || ""}
            onChange={(e) => updateField("promo", "buttonLink", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 md:col-span-2"
          />
        </div>

        <div className="space-y-4">

          {/* Image Preview */}
          <div className="relative h-52 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-800">
            {homepage.promo.backgroundImage ? (
              <img
                src={homepage.promo.backgroundImage}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">
                No Promo Image
              </div>
            )}

            <div className="absolute inset-0 bg-black/30"></div>

            {promoUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="text-sm text-white animate-pulse">Uploading image...</div>
              </div>
            )}

            <label className="absolute bottom-3 right-3 bg-black/70 hover:bg-purple-600 text-white text-xs px-3 py-1.5 rounded-md cursor-pointer transition">
              {promoUploading ? "Uploading..." : "Change Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setSelectedPromoFile(file);

                  const preview = URL.createObjectURL(file);

                  updateField("promo", "backgroundImage", preview);
                }}
                disabled={promoUploading}
              />
            </label>
          </div>

          {selectedPromoFile && (
            <button
              onClick={() => uploadPromoImage(selectedPromoFile)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-sm rounded-lg"
              disabled={promoUploading}
            >
              Upload Promo Image
            </button>
          )}

        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Testimonials</h2>

          <button
            onClick={() => {
              setEditingTestimonialIndex(null);
              setTestimonialDraft({ name: "", text: "", rating: 5 });
              setShowTestimonialModal(true);
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-sm rounded-lg"
          >
            Add Testimonial
          </button>
        </div>

        <div className="space-y-4">
          {(homepage.testimonials.reviews || []).length === 0 && (
            <div className="text-sm text-neutral-400">
              No testimonials added yet.
            </div>
          )}

          {(homepage.testimonials.reviews || []).map((t, index) => (
            <div
              key={index}
              className="border border-neutral-700 rounded-xl p-4 bg-neutral-800 flex justify-between items-start"
            >
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-neutral-400 mt-1">
                  {"⭐".repeat(t.rating || 5)}
                </div>
                <p className="text-sm text-neutral-200 mt-2">{t.text}</p>
              </div>

              <div className="flex gap-2">
                <button
                  className="text-xs px-3 py-1 rounded bg-purple-600 hover:bg-purple-700"
                  onClick={() => {
                    setEditingTestimonialIndex(index);
                    setTestimonialDraft(t);
                    setShowTestimonialModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="text-xs px-3 py-1 rounded bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    const updated = [...homepage.testimonials.reviews];
                    updated.splice(index, 1);

                    setHomepage({
                      ...homepage,
                      testimonials: {
                        ...homepage.testimonials,
                        reviews: updated,
                      },
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTestimonialModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <h3 className="text-lg font-semibold">
                {editingTestimonialIndex === null ? "Add Testimonial" : "Edit Testimonial"}
              </h3>
              <button
                className="text-neutral-400 hover:text-white"
                onClick={() => setShowTestimonialModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">

              <div>
                <label className="text-xs text-neutral-400">Name</label>
                <input
                  value={testimonialDraft.name}
                  onChange={(e) =>
                    setTestimonialDraft({
                      ...testimonialDraft,
                      name: e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400">Review</label>
                <textarea
                  value={testimonialDraft.text}
                  onChange={(e) =>
                    setTestimonialDraft({
                      ...testimonialDraft,
                      text: e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400">Rating</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={testimonialDraft.rating}
                  onChange={(e) =>
                    setTestimonialDraft({
                      ...testimonialDraft,
                      rating: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-neutral-800">
              <button
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm"
                onClick={() => setShowTestimonialModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
                onClick={() => {
                  const updated = [...(homepage.testimonials.reviews || [])];

                  if (editingTestimonialIndex === null) {
                    updated.push(testimonialDraft);
                  } else {
                    updated[editingTestimonialIndex] = testimonialDraft;
                  }

                  setHomepage({
                    ...homepage,
                    testimonials: {
                      ...homepage.testimonials,
                      reviews: updated,
                    },
                  });

                  setShowTestimonialModal(false);
                }}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {editingCategory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <h3 className="text-lg font-semibold">Edit Category</h3>
              <button
                className="text-neutral-400 hover:text-white transition"
                onClick={() => {
                  setEditingCategory(null);
                  setEditingCategoryIndex(null);
                }}
              >
                ✕
              </button>
            </div>

            {/* Image Preview */}
            <div className="relative h-44 bg-neutral-800">
              {editingCategory.image ? (
                <img
                  src={editingCategory.image}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">
                  No Image Selected
                </div>
              )}

              <div className="absolute inset-0 bg-black/30"></div>
              {categoryUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <div className="text-sm text-white animate-pulse">Uploading image...</div>
                </div>
              )}

              <label className="absolute bottom-3 right-3 bg-black/70 hover:bg-purple-600 text-white text-xs px-3 py-1.5 rounded-md cursor-pointer transition">
                {categoryUploading ? "Uploading..." : "Change Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setSelectedCategoryFile(file);

                    const preview = URL.createObjectURL(file);

                    setEditingCategory((prev) => ({
                      ...prev,
                      image: preview,
                    }));
                  }}
                  disabled={categoryUploading}
                />
              </label>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-xs text-neutral-400">
                  Category Name
                </label>
                <input
                  value={editingCategory.name || ""}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 transition"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400">Slug</label>
                <input
                  value={editingCategory.slug || ""}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      slug: e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 transition"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-neutral-800">
              <button
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition"
                onClick={() => {
                  setEditingCategory(null);
                  setEditingCategoryIndex(null);
                  setSelectedCategoryFile(null);
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm transition"
                onClick={async () => {
                  let finalImage = editingCategory.image;

                  if (selectedCategoryFile) {
                    const uploadedUrl = await uploadCategoryImage(selectedCategoryFile);
                    if (uploadedUrl) {
                      finalImage = uploadedUrl;
                    }
                  }

                  const updatedCategory = {
                    ...editingCategory,
                    image: finalImage,
                  };

                  const updated = [...(homepage.categoriesSection?.categories || [])];

                  if (editingCategoryIndex >= updated.length) {
                    updated.push(updatedCategory);
                  } else {
                    updated[editingCategoryIndex] = updatedCategory;
                  }

                  setHomepage({
                    ...homepage,
                    categoriesSection: {
                      ...homepage.categoriesSection,
                      categories: updated,
                    },
                  });

                  setSelectedCategoryFile(null);
                  setEditingCategory(null);
                  setEditingCategoryIndex(null);
                }}
                disabled={categoryUploading}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
