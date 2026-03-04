import React from "react";

const AdminSetting = () => {
  return (
    <div className="text-white max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold">Store Settings</h1>
        <p className="text-zinc-400 text-sm">
          Configure your store information and preferences
        </p>
      </div>

      <div className="space-y-8">

        {/* Store Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold mb-4 text-zinc-300">
            Store Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Store Name
              </label>
              <input
                type="text"
                placeholder="Nova Store"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Support Email
              </label>
              <input
                type="email"
                placeholder="support@store.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs text-zinc-400 block mb-1">
              Store Description
            </label>
            <textarea
              rows="3"
              placeholder="Write a short description about your store"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold mb-4 text-zinc-300">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Business Address
              </label>
              <input
                type="text"
                placeholder="City, Country"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Currency */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold mb-4 text-zinc-300">
            Pricing & Currency
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Currency
              </label>
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Tax Percentage
              </label>
              <input
                type="number"
                placeholder="18"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold mb-4 text-zinc-300">
            Shipping Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Flat Shipping Fee
              </label>
              <input
                type="number"
                placeholder="50"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">
                Free Shipping Above
              </label>
              <input
                type="number"
                placeholder="999"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </div>

        {/* Store Status */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Maintenance Mode</p>
            <p className="text-xs text-zinc-400">
              Temporarily disable the store for customers
            </p>
          </div>

          <input type="checkbox" className="accent-white" />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition">
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminSetting;
