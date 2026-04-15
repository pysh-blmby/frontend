import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id)
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return console.log("npt");
    }

    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_BASE}/orders/${id}`);
      const data = await res.json();
      console.log(data)
      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center py-20">
          <div className="text-zinc-400 text-lg">Loading order...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-black text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center py-12">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
              <p className="text-zinc-400">We couldn't find your order. Please check your order ID and try again.</p>
            </div>
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

      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-4xl font-bold mb-3">Order Placed Successfully!</h1>
            <p className="text-zinc-400 text-lg">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Order Info */}
              <div>
                <h2 className="text-xl font-bold mb-6">Order Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-zinc-400 text-sm">Order Number</p>
                    <p className="font-mono text-lg font-bold text-purple-400">
                      {order.orderNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Order Status</p>
                    <p className="font-semibold capitalize">
                      <span className="bg-yellow-900 text-yellow-200 px-3 py-1 rounded-full text-sm">
                        {order.orderStatus}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Payment Method</p>
                    <p className="font-semibold capitalize">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Order Date</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                <div className="space-y-2 text-zinc-300">
                  <p className="font-semibold">
                    {order.customer?.fullName || 'Customer'}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="text-sm">{order.customer.phone}</p>
                  <p className="text-sm">{order.customer.email}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-zinc-800 pt-8 mb-8">
              <h2 className="text-xl font-bold mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={`${item.productId || index}-${index}`} className="flex justify-between items-center bg-zinc-800 p-4 rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-zinc-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t border-zinc-800 pt-6">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-purple-400 text-2xl">
                  ₹{order.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>ℹ️</span> What's Next?
            </h3>
            <ul className="space-y-3 text-zinc-300 text-sm">
              <li>✓ Your order has been received and is being processed</li>
              <li>✓ You will receive a confirmation email shortly</li>
              <li>✓ We'll send you tracking details once your order ships (within 1-2 business days)</li>
              <li>✓ Keep your order number for reference</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-center font-medium transition"
            >
              Continue Shopping
            </Link>
            <a
              href={`mailto:${order.customer.email}`}
              className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-center font-medium transition"
            >
              Get Help
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
