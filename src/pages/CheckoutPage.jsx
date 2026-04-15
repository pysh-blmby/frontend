import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';


const CheckoutPage = () => {

  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  // Simple feedback helper
  const show = (msg) => {
    alert(msg);
  };

  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const res = await fetch(`${API_BASE}/cart/get-cart`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        const items = data.cart || [];
        setCartItems(items);
        console.log(items)
        const subtotal = items.reduce((acc, item) => {
          const price = item.discountPrice || item.price || 0;
          return acc + price * item.quantity;
        }, 0);

        const shipping = subtotal > 1000 ? 0 : 99;
        const tax = Math.round(subtotal * 0.05);

        setTotalPrice(subtotal);
        setShippingCost(shipping);
        setTaxAmount(tax);
      }
      setCartLoading(false);
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCartLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      await fetch(`${API_BASE}/cart/clear`, {
        method: 'DELETE',
        credentials: 'include'
      });
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.postalCode) {
      show('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      
      // Create order
      const orderData = {
        customer: {
          fullName: `${formData.firstName} ${formData.lastName || ''}`.trim(),
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        },
        items: cartItems.map(item => ({
          productId: item.product?._id || item.productId || item._id,
          quantity: item.quantity,
          price: item.discountPrice || item.price
        })),
        totalPrice: totalPrice + shippingCost + taxAmount,
        paymentMethod: formData.paymentMethod
      };

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        show('Order placed successfully!', 'success');
        clearCart();
        setTimeout(() => navigate(`/order-confirmation?id=${data.orderId}`), 2000);
      } else {
        show(data.message || 'Failed to place order. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      show('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-zinc-400">Loading your cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-black text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>
            <div className="text-center text-zinc-400">Your cart is empty</div>
            <div className="text-center mt-8">
              <Link
                to="/shop"
                className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
          Processing...
        </div>
      )}

      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address *"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600"
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State *"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code *"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600"
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-600"
                      >
                        <option>India</option>
                        <option>USA</option>
                        <option>UK</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-zinc-700 rounded-lg hover:border-zinc-600 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="accent-purple-600"
                      />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-zinc-400">Pay when you receive your order</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-zinc-700 rounded-lg bg-zinc-800/50 cursor-not-allowed">
                      <input
                        type="radio"
                        disabled
                        className="accent-zinc-600"
                      />
                      <div>
                        <p className="font-medium text-zinc-500">Online Payment</p>
                        <p className="text-sm text-zinc-600">Coming soon</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 rounded-lg font-bold text-white transition"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sticky top-20 space-y-6">
                <h2 className="text-xl font-bold">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 max-h-96 overflow-y-auto border-b border-zinc-800 pb-4">
                  {cartItems?.map((item, index) => (
                    <div key={`${item._id}-${index}`} className="flex justify-between text-sm">
                      <span className="text-zinc-300">
                        {item.product?.title || 'Product'}
                        <span className="text-purple-400 ml-1">×{item.quantity}</span>
                      </span>
                      <span>₹{((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">

                  <div className="flex justify-between text-zinc-400">
                    <span>Items ({cartItems.length})</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        `₹${shippingCost.toLocaleString('en-IN')}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>Estimated Tax (5%)</span>
                    <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>Delivery</span>
                    <span className="text-green-400">3‑5 days</span>
                  </div>

                </div>

                <div className="border-t border-zinc-800 pt-4 space-y-2">

                  <div className="flex justify-between text-zinc-400 text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-zinc-400 text-sm">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                  </div>

                  <div className="flex justify-between text-zinc-400 text-sm">
                    <span>Tax</span>
                    <span>₹{taxAmount}</span>
                  </div>

                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Total</span>
                    <span className="text-purple-400">
                      ₹{(totalPrice + shippingCost + taxAmount).toLocaleString('en-IN')}
                    </span>
                  </div>

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

export default CheckoutPage;
