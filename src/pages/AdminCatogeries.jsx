import React, { useState, useEffect } from "react";

const AdminCatogeries = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [notification, setNotification] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    isActive: true,
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories/get-categories`);
      const data = await res.json();
     console.log(data)
      if (data.success) {
        setCategories(data.categories || []);
      } else {
        console.error("Failed to fetch categories:", data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && cat.isActive) ||
      (statusFilter === "inactive" && !cat.isActive);
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalCategories = categories.length;
  const activeCategories = categories.filter((c) => c.isActive).length;
  const totalProducts = categories.reduce((acc, cat) => acc + (cat.products || 0), 0);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = editingCategory
        ? `${API_BASE}/admin/update-category/${editingCategory._id}`
        : `${API_BASE}/admin/create-category`;

      const method = editingCategory ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setNotification({
          type: "success",
          message: editingCategory
            ? "Category updated successfully"
            : "Category created successfully",
        });
        setShowModal(false);
        setFormData({ name: "", description: "", image: "", isActive: true });
        setEditingCategory(null);
        fetchCategories();
      } else {
        setNotification({
          type: "error",
          message: data.message || "Failed to save category",
        });
      }
    } catch (err) {
      console.error("Error saving category:", err);
      setNotification({
        type: "error",
        message: "Failed to save category",
      });
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`${API_BASE}/admin/delete-category/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setNotification({
          type: "success",
          message: "Category deleted successfully",
        });
        fetchCategories();
      } else {
        setNotification({
          type: "error",
          message: data.message || "Failed to delete category",
        });
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      setNotification({
        type: "error",
        message: "Failed to delete category",
      });
    }
  };

  // Open modal for editing
  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      isActive: category.isActive,
    });
    setShowModal(true);
  };

  // Open modal for adding
  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", image: "", isActive: true });
    setShowModal(true);
  };

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="text-white space-y-8">
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-sm z-50 ${
            notification.type === "success"
              ? "bg-green-600/20 text-green-400 border border-green-600/30"
              : "bg-red-600/20 text-red-400 border border-red-600/30"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Category Management</h1>
          <p className="text-zinc-400 text-sm">
            Create, edit and organize product categories for your store
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={openAddModal}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200"
          >
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading && (
        <div className="text-zinc-400 text-sm">Loading categories...</div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCategories.map((cat) => (
          <div
            key={cat._id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition"
          >
            <img
              src={cat.image || "https://via.placeholder.com/400x240?text=No+Image"}
              alt={cat.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{cat.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    cat.isActive
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {cat.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-xs text-zinc-400">
                {cat.description || "No description"}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => openEditModal(cat)}
                  className="flex-1 bg-blue-500/20 text-blue-400 text-xs py-2 rounded hover:bg-blue-500/30"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(cat._id)}
                  className="flex-1 bg-red-500/20 text-red-400 text-xs py-2 rounded hover:bg-red-500/30"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="font-medium">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter category name"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter category description"
                  rows={3}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Category Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setSelectedFile(file);
                  }}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                />

                {selectedFile && (
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          setUploadingImage(true);

                          const form = new FormData();
                          form.append("files", selectedFile);

                          const res = await fetch(`${API_BASE}/upload`, {
                            method: "POST",
                            body: form,
                          });

                          const data = await res.json();

                          const url = data.urls?.[0] || data.url;

                          if (url) {
                            setFormData((prev) => ({ ...prev, image: url }));
                            setSelectedFile(null);
                          } else {
                            setNotification({ type: "error", message: "Image upload failed" });
                          }
                        } catch (err) {
                          console.error("Upload error:", err);
                          setNotification({ type: "error", message: "Image upload failed" });
                        } finally {
                          setUploadingImage(false);
                        }
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                    >
                      {uploadingImage ? "Uploading..." : "Upload Image"}
                    </button>

                    <span className="text-xs text-zinc-400">Upload image to cloud</span>
                  </div>
                )}

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-3 w-full h-32 object-cover rounded-lg border border-zinc-700"
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Active Category</p>
                  <p className="text-xs text-zinc-400">
                    Enable to show category in store
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="accent-white"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200"
                >
                  {editingCategory ? "Update" : "Create"} Category
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg text-sm hover:bg-zinc-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCatogeries;
