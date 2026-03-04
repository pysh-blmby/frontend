import React from "react";

const dummyOrders = [
  {
    id: "#ORD-231",
    customer: "Rahul Sharma",
    items: 2,
    total: "₹2,999",
    status: "Pending",
    date: "Today",
  },
  {
    id: "#ORD-230",
    customer: "Aman Verma",
    items: 1,
    total: "₹1,499",
    status: "Shipped",
    date: "Today",
  },
  {
    id: "#ORD-229",
    customer: "Neha Kapoor",
    items: 3,
    total: "₹4,200",
    status: "Delivered",
    date: "Yesterday",
  },
];

const AdminOrder = () => {
  return (
    <div className="text-white">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Orders</h1>
          <p className="text-zinc-400 text-sm">
            Manage and track all customer orders
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by order ID or customer"
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
        />

        <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950 text-zinc-400">
            <tr>
              <th className="text-left px-6 py-3">Order ID</th>
              <th className="text-left px-6 py-3">Customer</th>
              <th className="text-left px-6 py-3">Items</th>
              <th className="text-left px-6 py-3">Total</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-zinc-800 hover:bg-zinc-800 transition"
              >
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4 text-zinc-300">{order.customer}</td>
                <td className="px-6 py-4 text-zinc-400">{order.items} items</td>
                <td className="px-6 py-4">{order.total}</td>

                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      order.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : order.status === "Shipped"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-zinc-400">{order.date}</td>

                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-400 text-xs hover:text-blue-300">
                    View
                  </button>

                  <button className="text-green-400 text-xs hover:text-green-300">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {dummyOrders.map((order) => (
          <div
            key={order.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm">{order.id}</h3>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  order.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : order.status === "Shipped"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-sm text-zinc-300 mb-1">{order.customer}</p>

            <div className="flex items-center justify-between text-sm text-zinc-400 mb-3">
              <span>{order.items} items</span>
              <span>{order.total}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">{order.date}</span>

              <div className="flex gap-2">
                <button className="bg-zinc-800 text-xs px-3 py-1 rounded hover:bg-zinc-700">
                  View
                </button>

                <button className="bg-zinc-800 text-xs px-3 py-1 rounded hover:bg-zinc-700">
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminOrder;
