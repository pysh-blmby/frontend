import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingProduct, setLoadingProduct] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [notification, setNotification] = useState(null);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    images: [],
    category: "",
    brand: "",
    isActive: true,
  });

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoadingProduct(true);

      try {
        const res = await fetch(`${API_BASE}/admin/get-product/${id}`);
        const data = await res.json();
        console.log(data)

        if (data && data.product) {
          const p = data.product;

          setForm({
            title: p.title || "",
            description: p.description || "",
            price: p.price || "",
            discountPrice: p.discountPrice || "",
            stock: p.stock || "",
            images: p.images || [],
            category: p.category?._id || p.category || "",
            brand: p.brand || "",
            isActive: p.isActive ?? true,
          });
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }

      setLoadingProduct(false);
    };

    fetchProduct();
  }, [id, API_BASE]);

  useEffect(() => {
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

    fetchCategories();
  }, [API_BASE]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleRemoveImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const uploadImagesToCloud = async () => {
    if (selectedFiles.length === 0) return;

    setUploadingImages(true);

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.urls) {
        const urls = Array.isArray(data.urls) ? data.urls : [data.urls];

        setForm((prev) => ({
          ...prev,
          images: [...prev.images, ...urls],
        }));

        setSelectedFiles([]);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    }

    setUploadingImages(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
      stock: Number(form.stock),
      images: [...form.images],
    };

    console.log("------ PRODUCT SUBMIT DEBUG ------");
    console.log("Form state:", form);
    console.log("Images being sent:", form.images);
    console.log("Final payload:", payload);
    console.log("API endpoint:", id ? `${API_BASE}/update-product/${id}` : `${API_BASE}/admin/create-product`);
    console.log("----------------------------------");

    try {
      const endpoint = id
        ? `${API_BASE}/admin/update-product/${id}`
        : `${API_BASE}/admin/create-product`;

      const method = id ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Product saved:", data);
        setNotification({
          type: "success",
          message: id ? "Product updated successfully" : "Product created successfully",
        });
        setTimeout(() => {
          navigate("/admin/products");
        }, 800);
      } else {
        console.error("Product creation failed:", data);
        setNotification({
          type: "error",
          message: "Failed to save product",
        });
      }
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div className="text-white max-w-4xl">

      {notification && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm ${
            notification.type === "success"
              ? "bg-green-600/20 text-green-400 border border-green-600/30"
              : "bg-red-600/20 text-red-400 border border-red-600/30"
          }`}
        >
          {notification.message}
        </div>
      )}

      {uploadingImages && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-sm text-white">Uploading images to cloud...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold">
          {id ? "Edit Product" : "Add Product"}
        </h1>
        <p className="text-zinc-400 text-sm">
          Create a new product for your store
        </p>
      </div>

      {loadingProduct && (
        <p className="text-sm text-zinc-400 mb-4">Loading product data...</p>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* Product Image Upload */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Product Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm"
          />

          {selectedFiles.length > 0 && (
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={uploadImagesToCloud}
                disabled={uploadingImages}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {uploadingImages ? "Uploading..." : "Upload Images"}
              </button>

              {uploadingImages && (
                <span className="text-xs text-zinc-400">
                  Uploading images to cloud...
                </span>
              )}
            </div>
          )}

          {form.images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {form.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt="product"
                    className="w-full h-24 object-cover rounded-lg border border-zinc-800"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Name */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Product Name
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write product description"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="₹ Price"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300 mb-2 block">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={form.discountPrice}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300 mb-2 block">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Available stock"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">Brand</label>

          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand name"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm"
          />
        </div>

        {/* Active Product Toggle */}
        <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
          <div>
            <p className="text-sm">Active Product</p>
            <p className="text-xs text-zinc-400">
              Disable to hide product from store
            </p>
          </div>

          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="accent-white"
          />
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
