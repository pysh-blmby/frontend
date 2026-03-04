import React from "react";
import AdminSideSection from "../sections/AdminSideSection";
import TopStatsAdmin from "../sections/TopStatsAdmin";

const recentOrders = [
  { id: "#ORD-231", customer: "Rahul Sharma", items: 2, total: "₹2,999", status: "Pending", date: "Today" },
  { id: "#ORD-230", customer: "Aman Verma", items: 1, total: "₹1,499", status: "Shipped", date: "Today" },
  { id: "#ORD-229", customer: "Neha Kapoor", items: 3, total: "₹4,200", status: "Delivered", date: "Yesterday" },
];

const lowStock = [
  { name: "Black Hoodie", category: "Men", stock: 3 },
  { name: "Running Shoes", category: "Footwear", stock: 2 },
  { name: "Leather Wallet", category: "Accessories", stock: 4 },
];

const AdminDashboard = () => {
  return (
    <section>
    {/* Top Stats */}
      <TopStatsAdmin />

      {/* Quick Actions */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm font-medium hover:bg-zinc-800 transition">
            ➕ Add Product
          </button>
          <button className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm font-medium hover:bg-zinc-800 transition">
            📂 Add Category
          </button>
          <button className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm font-medium hover:bg-zinc-800 transition">
            📦 View Orders
          </button>
          <button className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm font-medium hover:bg-zinc-800 transition">
            ⚙ Store Settings
          </button>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Orders */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Recent Orders</h3>

          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm"
              >
                <div>
                  <p className="text-white">{order.id}</p>
                  <p className="text-zinc-400 text-xs">{order.customer}</p>
                </div>

                <div className="text-zinc-400 hidden sm:block">
                  {order.items} items
                </div>

                <div className="text-white">{order.total}</div>

                <div
                  className={`text-xs px-2 py-1 rounded ${
                    order.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : order.status === "Shipped"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Low Stock Alerts</h3>

          <div className="space-y-4">
            {lowStock.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm"
              >
                <div>
                  <p className="text-white">{item.name}</p>
                  <p className="text-zinc-400 text-xs">{item.category}</p>
                </div>

                <div className="text-red-400 text-xs">
                  {item.stock} left
                </div>

                <button className="text-xs px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Recently Added Products */}
      <section className="mt-10">
        <h3 className="text-white font-semibold mb-4">Recently Added Products</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "Sneakers", price: "₹2,499", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
            { name: "Denim Jacket", price: "₹3,199", image: "https://images.unsplash.com/photo-1520975916090-3105956dac38" },
            { name: "Leather Bag", price: "₹2,799", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7" },
            { name: "Running Shoes", price: "₹2,199", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb" }
          ].map(
            (product, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm hover:bg-zinc-800 transition"
              >
                <div className="bg-zinc-800 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={`${product.image}?w=400`}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                </div>

                <p className="text-white font-medium">{product.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-zinc-300 text-sm">{product.price}</p>
                  <p className="text-zinc-500 text-xs">Edit</p>
                </div>
              </div>
            )
          )}
        </div>
      </section></section>
  );
};

export default AdminDashboard;
