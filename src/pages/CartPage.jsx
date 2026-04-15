import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/cart/get-cart`, {
        credentials: "include",
      });

      const data = await res.json();
      console.log(data)
      if (data.success) {
        setCartItems(data.cart || []);
        setTotalPrice(data.totalAmount || 0);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

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
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await fetch(`${API_BASE}/cart/remove/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchCart();
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };

  const clearCart = async () => {
    try {
      await fetch(`${API_BASE}/cart/clear`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchCart();
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  const savings = cartItems.reduce((acc, item) => {
    const product = item.product;
    if (product?.discountPrice && product?.price) {
      const diff = product.price - product.discountPrice;
      return acc + diff * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-zinc-400">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-zinc-900 rounded-lg border border-zinc-800">
                  <p className="text-zinc-400 mb-4">Your cart is empty</p>
                  <Link
                    to="/shop"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const product = item.product;
                    const price =
                      product?.discountPrice || product?.price || 0;

                    return (
                      <div
                        key={product?._id}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex gap-4 hover:border-zinc-700 transition"
                      >
                        {/* Image */}
                        <Link
                          to={`/product/${product?._id}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={product?.images?.[0] || "/placeholder.jpg"}
                            alt={product?.title}
                            className="w-32 h-32 rounded-lg object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1">
                          <Link
                            to={`/product/${product?._id}`}
                            className="font-semibold hover:text-purple-400 transition"
                          >
                            {product?.title}
                          </Link>

                          <p className="text-lg font-bold mt-3">
                            ₹{price.toLocaleString("en-IN")}
                          </p>

                          {product?.price > price && (
                            <p className="text-sm text-zinc-500 line-through">
                              ₹{product.price.toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(product._id)}
                            className="text-red-500 hover:text-red-400 transition text-sm"
                          >
                            Remove
                          </button>

                          <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product._id,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-zinc-700 rounded"
                            >
                              −
                            </button>

                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(
                                  product._id,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-zinc-700 rounded"
                            >
                              +
                            </button>
                          </div>

                          <p className="font-semibold mt-2">
                            ₹{(price * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link
                  to="/shop"
                  className="inline-block px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sticky top-20 space-y-6">
                <h2 className="text-xl font-bold">Order Summary</h2>

                {savings > 0 && (
                  <div className="bg-green-900/30 border border-green-800 rounded-lg p-3">
                    <p className="text-green-200 text-sm">
                      💚 You save ₹{savings.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}

                <div className="space-y-3 text-sm border-t border-zinc-800 pt-4">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span className="text-green-400">FREE</span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>Tax</span>
                    <span>₹0</span>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span className="text-purple-400">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition mb-3">
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
