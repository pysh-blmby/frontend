import React, { useState } from "react";

const navItems = [
  { name: "Dashboard", icon: "📊" },
  { name: "Products", icon: "🛍️" },
  { name: "Categories", icon: "📂" },
  { name: "Orders", icon: "📦" },
  { name: "Coupons", icon: "🎟️" },
  { name: "Customers", icon: "👥" },
  { name: "Analytics", icon: "📈" },
  { name: "Settings", icon: "⚙️" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-5 left-5 z-50 bg-zinc-900 text-white p-3 rounded-lg border border-white/10 shadow-lg"
      >
        ☰
      </button>
      <aside
        className={`
          fixed md:relative top-0 left-0 z-40
          ${collapsed ? "md:w-20" : "md:w-64"}
          w-64
          h-screen
          bg-linear-to-b from-zinc-950 via-zinc-900 to-black
          text-white flex flex-col border-r border-white/10
          transition-all duration-500 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        
        {/* Desktop Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
            hidden md:flex
            absolute top-6 right-0 translate-x-1/2
            z-50
            bg-linear-to-br from-indigo-600 to-purple-600
            hover:scale-110
            text-white w-9 h-9
            rounded-full items-center justify-center
            shadow-xl backdrop-blur-md
            border border-white/20
            transition-all duration-500 ease-in-out
          `}
        >
          <span
            className={`transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`}
          >
            ➤
          </span>
        </button>

        {/* Logo Section */}
        <div className="px-6 py-6 border-b border-white/10">
          <h1
            className={`text-2xl font-semibold tracking-wide transition-all duration-300 ${
              collapsed ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            NovaAdmin
          </h1>
          {!collapsed && (
            <p className="text-xs text-zinc-400 mt-1">
              E‑Commerce Control Panel
            </p>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white transition-all duration-300 group"
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && (
                <span className="transition-opacity duration-300">
                  {item.name}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="px-3 py-6 border-t border-white/10">
          <button
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-300"
          >
            <span className="text-lg">🚪</span>
            {!collapsed && "Logout"}
          </button>
        </div>

      </aside>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
};

export default AdminSidebar;
