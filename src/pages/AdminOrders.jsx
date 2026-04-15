import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders/admin/all`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("orders fetch error", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders/admin/stats`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setStats(data);
      }
    } catch (err) {
      console.error("stats fetch error", err);
    }
  };

  const refresh = async () => {
    setLoading(true);
    await Promise.all([fetchOrders(), fetchStats()]);
    setLoading(false);
  };

  const updateStatus = async (orderId, status) => {
    try {
      await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      refresh();
    } catch (err) {
      console.error("status update error", err);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
        method: "PUT",
        credentials: "include",
      });

      refresh();
    } catch (err) {
      console.error("cancel order error", err);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const filteredOrders = orders.filter((o) =>
    o.orderNumber.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
    processing: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    shipped: "bg-purple-500/20 text-purple-300 border-purple-400/30",
    completed: "bg-green-500/20 text-green-300 border-green-400/30",
    cancelled: "bg-red-500/20 text-red-300 border-red-400/30",
  };

  const paymentColors = {
    pending: "bg-orange-500/20 text-orange-300",
    paid: "bg-green-500/20 text-green-300",
    failed: "bg-red-500/20 text-red-300",
  };

  if (loading) {
    return (
      <div className="p-10 text-white">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="text-white space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Orders Dashboard</h1>
          <p className="text-zinc-400 text-sm">
            Monitor and manage all store orders
          </p>
        </div>

        <div className="flex gap-3">
          <input
            placeholder="Search order number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-black/40 border border-white/10 px-4 py-2 rounded-lg text-sm"
          />

          <button
            onClick={refresh}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* DASHBOARD STATS */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <StatCard
            title="Total Orders"
            value={stats.totalOrders || orders.length}
            color="from-purple-600 to-indigo-600"
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.revenue || 0}`}
            color="from-green-600 to-emerald-600"
          />

          <StatCard
            title="Pending"
            value={stats.pending || 0}
            color="from-yellow-500 to-orange-500"
          />

          <StatCard
            title="Completed"
            value={stats.completed || 0}
            color="from-blue-600 to-cyan-600"
          />

        </div>
      )}

      {/* STATUS OVERVIEW */}
      {stats && (
        <div className="grid md:grid-cols-5 gap-4">

          <StatusBox label="Pending" value={stats.pending || 0} color="yellow"/>
          <StatusBox label="Processing" value={stats.processing || 0} color="blue"/>
          <StatusBox label="Shipped" value={stats.shipped || 0} color="purple"/>
          <StatusBox label="Completed" value={stats.completed || 0} color="green"/>
          <StatusBox label="Cancelled" value={stats.cancelled || 0} color="red"/>

        </div>
      )}

      {/* ORDERS */}
      <div className="space-y-5">

        {filteredOrders.length === 0 && (
          <div className="text-center py-10 text-zinc-400">
            No orders found
          </div>
        )}

        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-purple-500/40 transition"
          >

            {/* ORDER HEADER */}
            <div className="flex justify-between items-center mb-4">

              <div>
                <p className="font-semibold text-sm">{order.orderNumber}</p>
                <p className="text-xs text-zinc-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">

                <span
                  className={`px-3 py-1 text-xs rounded-full border flex items-center gap-1 ${statusColors[order.orderStatus]}`}
                >
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  {order.orderStatus}
                </span>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${paymentColors[order.paymentStatus]}`}
                >
                  {order.paymentStatus}
                </span>

              </div>

            </div>

            {/* CUSTOMER */}
            <div className="text-sm text-zinc-300 mb-4">
              {order.customer?.email} • {order.customer?.phone}
            </div>

            {/* PRODUCTS */}
            <div className="flex gap-4 overflow-x-auto pb-2">

              {order.items.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 items-center bg-black/50 border border-white/10 rounded-lg px-3 py-2 min-w-[220px]"
                >

                  <img
                    src={item.image}
                    className="w-12 h-12 rounded object-cover"
                  />

                  <div className="text-xs">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-zinc-400">Qty: {item.quantity}</p>
                    <p className="text-purple-400">₹{item.price}</p>
                  </div>

                </div>
              ))}

            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-5">

              <div className="text-lg font-semibold text-purple-400">
                ₹{order.totalPrice?.toLocaleString("en-IN")}
              </div>

              <div className="flex gap-2">

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  onClick={() => cancelOrder(order._id)}
                  className="px-3 py-1 text-xs rounded bg-red-500/20 text-red-300 hover:bg-red-500/40"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`bg-gradient-to-br ${color} p-5 rounded-xl shadow-lg`}>
    <p className="text-xs text-white/80">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const StatusBox = ({ label, value, color }) => (
  <div className={`bg-${color}-500/10 border border-${color}-500/30 rounded-lg p-4 flex justify-between items-center`}>
    <span className="text-sm text-white/70">{label}</span>
    <span className={`text-${color}-400 font-bold text-lg`}>{value}</span>
  </div>
);

export default AdminOrders;