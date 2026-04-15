import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: "📊", path: "/admin" },
  { name: "Products", icon: "🛍️", path: "/admin/products" },
  { name: "Categories", icon: "📂", path: "/admin/categories" },
  { name: "Orders", icon: "📦", path: "/admin/orders" },
  { name: "Coupons", icon: "🎟️", path: "/admin/coupons" },
  { name: "Homepage", icon: "🏠", path: "/admin/homepage" },
  { name: "Analytics", icon: "📈", path: "/admin/analytics" },
  { name: "Settings", icon: "⚙️", path: "/admin/settings" },
];

const AdminSideSection = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-900 text-white relative overflow-hidden">
      

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-screen
          w-56 md:w-60 lg:w-64
          bg-black/70 backdrop-blur-xl
          text-white flex flex-col
          border-r border-white/10 shadow-2xl
          overflow-y-auto overscroll-contain
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          z-40 md:z-auto
        `}
      >
        
        {/* Logo + Mobile Close */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              NovaAdmin
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Control Panel
            </p>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-2xl text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 pb-10">
          {navItems.map((item, index) => (
            <NavLink
              to={item.path}
              onClick={() => setMobileOpen(false)}
              key={index}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:translate-x-1 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
            <span className="text-lg">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      <div
        onClick={() => setMobileOpen(false)}
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          md:hidden z-30
        `}
      />

      {/* RIGHT SIDE (HEADER + CONTENT) */}
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="w-full bg-black/40 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between relative">
          
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden mr-3 text-2xl text-white transition-transform duration-300"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>

          {/* Page Title */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-3">
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-tight">
              Dashboard
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              Welcome back, Admin 👋
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/10 text-white placeholder-gray-400 text-sm px-3 md:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition w-28 sm:w-44 md:w-64 backdrop-blur-md"
              />
            </div>

            {/* Notifications */}
            <button className="relative text-xl text-gray-400 hover:text-white transition">
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                3
              </span>
            </button>

            
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-transparent">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminSideSection;
