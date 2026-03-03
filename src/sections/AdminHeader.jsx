import React from "react";

const AdminHeader = () => {
  return (
    <header className="w-full bg-linear-to-r from-zinc-950 via-zinc-900 to-black border-b border-white/10 px-8 py-5 flex items-center justify-between">
      
      {/* Left Section - Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Dashboard
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search products, orders..."
            className="bg-white/5 backdrop-blur-md text-sm text-white placeholder-zinc-400 px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-72"
          />
        </div>

        {/* Notifications */}
        <button className="relative text-xl text-zinc-300 hover:text-white transition">
          🔔
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5">
            3
          </span>
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-lg group-hover:scale-105 transition">
            PA
          </div>
        </div>

      </div>

    </header>
  );
};

export default AdminHeader;
