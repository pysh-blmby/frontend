import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const storeName = "StoreName"; // later fetch from store settings

 
  return (
    <>
      <nav className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8 pt-4">
        <div className="max-w-7xl mx-auto h-14 md:h-16 flex items-center justify-between bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-xl rounded-3xl px-4 sm:px-6 lg:px-10">

          {/* Logo / Company Name */}
          <div className="text-[22px] font-semibold tracking-wide text-white">
            {storeName}
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-10 text-[14px] lg:text-[15px] font-medium text-white/80">
            <li>
              <Link to="/" className="cursor-pointer hover:text-white transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="cursor-pointer hover:text-white transition-colors duration-300">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/categories" className="cursor-pointer hover:text-white transition-colors duration-300">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/about" className="cursor-pointer hover:text-white transition-colors duration-300">
                About
              </Link>
            </li>
          </ul>

          {/* Actions: Search + Cart */}
          <div className="flex items-center gap-3 md:gap-4 text-white/80">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-neutral-800/70 border border-white/10 rounded-full px-4 h-10 w-40 lg:w-64 focus-within:border-purple-500 transition-all">
              <span className="text-white/60 mr-2">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm text-white placeholder-white/50 w-full"
              />
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-lg hover:text-white transition"
            >
              🛒
            </button>
          </div>

          {/* Hamburger */}
          <div className="md:hidden ml-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex flex-col justify-center items-center gap-1"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-6 text-white/90">

          {/* Mobile Search */}
          <div className="flex items-center bg-neutral-800/70 border border-white/10 rounded-full px-4 h-10">
            <span className="text-white/60 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/50 flex-1"
            />
          </div>

          {/* Mobile Links */}
          <div className="space-y-4 text-[15px]">
            <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-white cursor-pointer">Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block hover:text-white cursor-pointer">Shop</Link>
            <Link to="/categories" onClick={() => setIsOpen(false)} className="block hover:text-white cursor-pointer">Categories</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:text-white cursor-pointer">About</Link>
          </div>
        </div>
      )}
    </nav>
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
