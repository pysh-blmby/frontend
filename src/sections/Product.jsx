import React, { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
];

const reviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    rating: 5,
    comment: "Incredible quality. The fabric feels premium and the fit is perfect.",
  },
  {
    id: 2,
    name: "Riya Mehta",
    rating: 4,
    comment: "Very comfortable hoodie. Delivery was quick and packaging was great.",
  },
  {
    id: 3,
    name: "Kabir Singh",
    rating: 5,
    comment: "Definitely worth the price. Looks amazing and feels even better.",
  },
];

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="w-full bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedImage}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square w-24 rounded-lg overflow-hidden border transition ${
                    selectedImage === img
                      ? "border-white"
                      : "border-zinc-800"
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-sm text-zinc-400 uppercase tracking-wide">
              NovaStore Essentials
            </span>

            <h1 className="text-4xl font-semibold mt-4 mb-4">
              Premium Oversized Hoodie
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-semibold">₹1,499</span>
              <span className="text-sm text-green-500">In Stock</span>
            </div>

            <div className="flex items-center gap-2 mb-6 text-yellow-400">
              ★★★★★ <span className="text-zinc-400 text-sm">(128 Reviews)</span>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-8">
              Crafted with ultra-soft premium cotton for maximum comfort and durability.
              Designed with a relaxed fit that elevates your everyday street style.
              Breathable, lightweight, and perfect for all seasons.
            </p>

            {/* Features */}
            <ul className="space-y-2 text-sm text-zinc-400 mb-8">
              <li>✔ 100% Premium Cotton</li>
              <li>✔ Relaxed Oversized Fit</li>
              <li>✔ Fade Resistant Fabric</li>
              <li>✔ Machine Wash Safe</li>
            </ul>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4 text-zinc-400">Select Size</h3>
              <div className="flex gap-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm transition ${
                      selectedSize === size
                        ? "border-white bg-white text-black"
                        : "border-zinc-700 hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4 text-zinc-400">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="px-4 py-2 border border-zinc-700 rounded-md"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-zinc-700 rounded-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-white text-black py-3 rounded-md font-medium hover:bg-zinc-200 transition">
                Add to Cart
              </button>
              <button className="flex-1 border border-white py-3 rounded-md font-medium hover:bg-white hover:text-black transition">
                Buy Now
              </button>
            </div>

            {/* Shipping Info */}
            <div className="mt-10 border-t border-zinc-800 pt-6 text-sm text-zinc-400 space-y-2">
              <p>🚚 Free shipping on orders above ₹999</p>
              <p>🔄 Easy 7-day return policy</p>
              <p>🔒 Secure payment & checkout</p>
            </div>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="mt-24 border-t border-zinc-800 pt-16">
          <h2 className="text-3xl font-semibold mb-6">Product Details</h2>
          <p className="text-zinc-400 leading-relaxed max-w-4xl">
            This premium oversized hoodie blends comfort and style seamlessly.
            Made from high-quality cotton fabric, it offers breathability and durability.
            The relaxed silhouette makes it perfect for layering or wearing on its own.
            Designed for modern streetwear lovers who value both comfort and aesthetics.
          </p>
        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-24 border-t border-zinc-800 pt-16">
          <h2 className="text-3xl font-semibold mb-10">Customer Reviews</h2>

          <div className="space-y-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{review.name}</h4>
                  <span className="text-yellow-400">
                    {"★".repeat(review.rating)}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Product;
