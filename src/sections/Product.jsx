import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const addToCartAPI = async () => {
    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        console.error("Add to cart failed:", data.message);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      const data = await res.json();

      if (data.success) {
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
        setSelectedImage(data.product?.images?.[0] || "/placeholder.jpg");
      }
    } catch (err) {
      console.error("Failed to fetch product:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="aspect-square bg-zinc-900 rounded-2xl animate-pulse"></div>
            <div className="space-y-6">
              <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
              <div className="h-8 bg-zinc-800 rounded w-2/3"></div>
              <div className="h-6 bg-zinc-800 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded"></div>
                <div className="h-4 bg-zinc-800 rounded"></div>
                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="w-full bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <p className="text-zinc-400 mb-8">The product you're looking for doesn't exist.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedImage || product.images?.[0] || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, index) => (
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
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <span className="text-sm text-zinc-400 uppercase tracking-wide">
              {product.brand || product.category?.name || "Product"}
            </span>

            <h1 className="text-4xl font-semibold mt-4 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-semibold">₹{product.price}</span>
              {product.discountPrice && (
                <span className="text-lg text-zinc-400 line-through">₹{product.discountPrice}</span>
              )}
              <span className={`text-sm ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6 text-yellow-400">
              ★★★★★ <span className="text-zinc-400 text-sm">({product.reviews?.length || 0} Reviews)</span>
            </div>

            <p className="text-zinc-400 leading-relaxed mb-8">
              {product.description || "No description available."}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <ul className="space-y-2 text-sm text-zinc-400 mb-8">
                {product.features.map((feature, index) => (
                  <li key={index}>✔ {feature}</li>
                ))}
              </ul>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4 text-zinc-400">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="px-4 py-2 border border-zinc-700 rounded-md"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      product.stock ? (q < product.stock ? q + 1 : q) : q + 1
                    )
                  }
                  className="px-4 py-2 border border-zinc-700 rounded-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                disabled={product.stock <= 0}
                onClick={async () => {
                  await addToCartAPI();
                  setQuantity(1);
                }}
                className="flex-1 bg-white text-black py-3 rounded-md font-medium hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
        {product.description && (
          <div className="mt-24 border-t border-zinc-800 pt-16">
            <h2 className="text-3xl font-semibold mb-6">Product Details</h2>
            <p className="text-zinc-400 leading-relaxed max-w-4xl">
              {product.description}
            </p>
          </div>
        )}

        {/* REVIEWS SECTION */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-24 border-t border-zinc-800 pt-16">
            <h2 className="text-3xl font-semibold mb-10">Customer Reviews</h2>

            <div className="space-y-8">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{review.user?.name || "Anonymous"}</h4>
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
        )}

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-zinc-800 pt-16">
            <h2 className="text-3xl font-semibold mb-10">Related Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct._id}`}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-white transition-all duration-300 hover:-translate-y-1 block"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.images?.[0] || "/placeholder.jpg"}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur px-3 py-1 text-xs rounded-full">
                      {relatedProduct.brand || relatedProduct.category?.name || "Product"}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-semibold mb-1 group-hover:text-zinc-300 transition">
                      {relatedProduct.title}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <p className="text-white font-medium">
                        ₹{relatedProduct.price}
                      </p>
                      {relatedProduct.discountPrice && (
                        <p className="text-zinc-400 text-sm line-through">
                          ₹{relatedProduct.discountPrice}
                        </p>
                      )}
                    </div>

                    <button className="w-full py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition">
                      View Details
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Product;
