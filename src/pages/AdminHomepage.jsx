import React, { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminHomepage() {
  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedHeroFiles, setSelectedHeroFiles] = useState([]);

  const uploadHeroImages = async () => {
    if (!selectedHeroFiles.length) return;

    try {
      const formData = new FormData();

      selectedHeroFiles.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        const newImages = [
          ...(homepage.hero.images || []),
          ...(data.urls || [])
        ];

        updateField("hero", "images", newImages);
        setSelectedHeroFiles([]);
      } else {
        console.error("Upload failed:", data);
      }

    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const fetchHomepage = async () => {
    try {
      const res = await fetch(`${API_BASE}/homepage`);
      const data = await res.json();
      setHomepage(data);
    } catch (err) {
      console.error("Failed to load homepage", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomepage();
  }, []);

const updateHomepage = async () => {
    try {
      const res = await fetch(`${API_BASE}/homepage`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(homepage)
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
        [field]: value
      }
    }));
  };

  if (loading || !homepage) {
    return (
      <div className="p-8 text-white">
        Loading homepage data...
      </div>
    );
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

        <div className="space-y-4">

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
                    const newImages = homepage.hero.images.filter((_, i) => i !== index);
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
                    e.target.value.trim()
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
                    input.value.trim()
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
                <p className="text-sm font-medium text-neutral-200">Upload Hero Images</p>
                <p className="text-xs text-neutral-400 mt-1">Select one or multiple images for the hero section</p>
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
        <h2 className="text-lg font-semibold">Categories Section</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={homepage.categories.title || ""}
            onChange={(e) => updateField("categories", "title", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />

          <input
            value={homepage.categories.subtitle || ""}
            onChange={(e) => updateField("categories", "subtitle", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />
        </div>
      </div>


      {/* FEATURED PRODUCTS */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 shadow-lg">
        <h2 className="text-lg font-semibold">Featured Products</h2>

        <input
          value={homepage.featuredProducts.title || ""}
          onChange={(e) => updateField("featuredProducts", "title", e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
        />

        <div className="border border-dashed border-neutral-700 rounded-lg p-4 md:p-6 text-center text-sm text-neutral-400 hover:border-purple-500 transition cursor-pointer">
          Select Featured Products
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

        <div className="border border-dashed border-neutral-700 rounded-lg p-4 md:p-6 text-center text-sm text-neutral-400 hover:border-purple-500 transition cursor-pointer">
          Upload Promo Image
        </div>
      </div>


      {/* TESTIMONIALS */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 shadow-lg">
        <h2 className="text-lg font-semibold">Testimonials</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={homepage.testimonials.title || ""}
            onChange={(e) => updateField("testimonials", "title", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />

          <input
            value={homepage.testimonials.subtitle || ""}
            onChange={(e) => updateField("testimonials", "subtitle", e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
          />
        </div>

        <div className="border border-dashed border-neutral-700 rounded-lg p-4 md:p-6 text-center text-sm text-neutral-400 hover:border-purple-500 transition cursor-pointer">
          Add / Manage Reviews
        </div>
      </div>

    </div>
  );
}
