
import React, { useState } from "react";

const initialCart = [
  {
    id: 1,
    name: "Premium Oversized Hoodie",
    size: "M",
    price: 1499,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
  },
  {
    id: 2,
    name: "Classic White Sneakers",
    size: "42",
    price: 2999,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold mb-3">Your Cart</h1>
          <p className="text-zinc-400 text-sm">
            {cartItems.length} item{cartItems.length !== 1 && "s"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 bg-zinc-900 p-6 rounded-2xl border border-zinc-800"
              >
                {/* Image */}
                <div className="sm:w-40 aspect-square bg-zinc-800 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium mb-2">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-500 hover:text-red-400 transition"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-zinc-400 text-sm mb-4">
                      Size: {item.size}
                    </p>

                    <p className="text-white font-semibold">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-4 py-2 border border-zinc-700 rounded-md hover:border-white transition"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-4 py-2 border border-zinc-700 rounded-md hover:border-white transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 h-fit sticky top-24">
            <h2 className="text-2xl font-semibold mb-8">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>

              <div className="border-t border-zinc-800 pt-4 flex justify-between text-white font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-white text-black py-3 rounded-md font-medium hover:bg-zinc-200 transition">
              Proceed to Checkout
            </button>

            <p className="text-xs text-zinc-500 mt-6">
              Free shipping on orders above ₹2000. Secure payment guaranteed.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cart;
