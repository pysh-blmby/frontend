import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL; // adjust if needed

const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/cart/get-cart`, {
        credentials: "include",
      });
      const data = await res.json();
      
      if (data.success) {
        setCartItems(data.cart || []);
        setTotalPrice(data.totalAmount || 0);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const updateQuantity = async (productId, quantity) => {
    try {
      await fetch(`${API_BASE}/cart/update-quantity/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });

      fetchCart();
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await fetch(`${API_BASE}/cart/remove/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchCart();
    } catch (err) {
      console.error("Remove item error:", err);
    }
  };

  const savings = cartItems.reduce((acc, item) => {
    if (item.product?.discountPrice && item.product?.price) {
      const diff = item.product.price - item.product.discountPrice;
      return acc + diff * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-zinc-950 border-l border-zinc-800 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Shopping Cart
                </h2>
                <p className="text-xs text-zinc-400">
                  {cartItems.length} items
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">🛒</div>
                  <p className="text-zinc-400 text-sm">Your cart is empty</p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="inline-block mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const product = item.product;
                    const price = product?.discountPrice || product?.price;

                    return (
                      <div
                        key={product?._id}
                        className="flex gap-3 bg-zinc-900 p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 transition"
                      >
                        <Link
                          to={`/product/${product?._id}`}
                          onClick={onClose}
                          className="shrink-0"
                        >
                          <img
                            src={product?.images?.[0] || "/placeholder.jpg"}
                            alt={product?.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${product?._id}`}
                            onClick={onClose}
                            className="text-sm font-medium text-white hover:text-purple-400 transition block truncate"
                          >
                            {product?.title}
                          </Link>

                          <p className="text-xs text-zinc-400 mt-0.5">
                            ₹{price?.toLocaleString("en-IN")}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product._id,
                                  item.quantity - 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded text-xs"
                            >
                              −
                            </button>

                            <span className="text-xs font-medium w-4 text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(
                                  product._id,
                                  item.quantity + 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded text-xs"
                            >
                              +
                            </button>

                            <button
                              onClick={() => removeItem(product._id)}
                              className="ml-auto text-xs text-red-500 hover:text-red-400 transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="sticky bottom-0 bg-zinc-950 border-t border-zinc-800 px-6 py-4 space-y-4">
                {savings > 0 && (
                  <div className="bg-green-900/30 border border-green-800 rounded-lg p-3 text-xs">
                    <p className="text-green-200">
                      💚 You save ₹{savings.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="border-t border-zinc-800 pt-2 flex justify-between font-semibold text-white">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="block w-full text-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white transition text-sm"
                  >
                    View Cart
                  </Link>

                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full text-center px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition text-sm"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
