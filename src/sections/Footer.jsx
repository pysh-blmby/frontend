import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-gray-300 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              NovaStore
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Elevating everyday essentials with premium quality and modern design.
              Trusted by thousands of customers across the country.
            </p>
            <div className="flex gap-4 text-lg">
              <span className="cursor-pointer hover:text-white transition">🌐</span>
              <span className="cursor-pointer hover:text-white transition">📸</span>
              <span className="cursor-pointer hover:text-white transition">🐦</span>
              <span className="cursor-pointer hover:text-white transition">▶</span>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition">Men</li>
              <li className="hover:text-white cursor-pointer transition">Women</li>
              <li className="hover:text-white cursor-pointer transition">Accessories</li>
              <li className="hover:text-white cursor-pointer transition">New Arrivals</li>
              <li className="hover:text-white cursor-pointer transition">Best Sellers</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition">Contact Us</li>
              <li className="hover:text-white cursor-pointer transition">FAQs</li>
              <li className="hover:text-white cursor-pointer transition">Shipping & Returns</li>
              <li className="hover:text-white cursor-pointer transition">Track Order</li>
              <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition">Terms & Conditions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Email: support@novastore.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Mon - Sat: 10:00 AM - 7:00 PM</li>
              <li>Panipat, Haryana, India</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>© {new Date().getFullYear()} NovaStore. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition">
              Refund Policy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Cookie Policy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Sitemap
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
