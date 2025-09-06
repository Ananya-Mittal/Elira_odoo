import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './ProductSection.css'; // ✅ Import CSS

const ProductSection = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  const products = [
    {
      id: 'laptop',
      title: 'Premium Laptop',
      price: '$999',
      originalPrice: '$1299',
      discount: '23%',
      icon: '💻',
      rating: 4.8,
      reviews: 156,
      inStock: true
    },
    {
      id: 'shoes',
      title: 'Running Shoes',
      price: '$79',
      originalPrice: '$99',
      discount: '20%',
      icon: '👟',
      rating: 4.6,
      reviews: 89,
      inStock: true
    },
    {
      id: 'watch',
      title: 'Smart Watch',
      price: '$199',
      originalPrice: '$249',
      discount: '20%',
      icon: '⌚',
      rating: 4.9,
      reviews: 234,
      inStock: false
    },
    {
      id: 'headphones',
      title: 'Wireless Headphones',
      price: '$59',
      originalPrice: '$79',
      discount: '25%',
      icon: '🎧',
      rating: 4.7,
      reviews: 128,
      inStock: true
    }
  ];

  const handleAddToCart = (product) => {
    if (!product.inStock) return;
    setCartItems((prev) => [...prev, product]);
    console.log(`Added ${product.title} to cart`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }

    return stars.join('');
  };

  return (
    <section className="featured-products">
      <h2 className="section-title">Featured Products</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`product-card ${hoveredProduct === product.id ? 'hovered' : ''} ${
              !product.inStock ? 'out-of-stock' : ''
            }`}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => navigate(`/item/${product.id}`)} // ✅ Navigate to product details
          >
            <div className="product-badge">
              {product.discount && (
                <span className="discount-badge">-{product.discount}</span>
              )}
              {!product.inStock && (
                <span className="stock-badge">Out of Stock</span>
              )}
            </div>

            <div className="product-image">
              <span className="product-icon">{product.icon}</span>
              <div className="image-overlay"></div>
              <button
                className="quick-view"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering card click
                  navigate(`/item/${product.id}`);
                }}
              >
                <span>👁️</span>
                Quick View
              </button>
            </div>

            <div className="product-content">
              <div className="product-rating">
                <span className="stars">{renderStars(product.rating)}</span>
                <span className="rating-text">({product.reviews})</span>
              </div>

              <h3 className="product-title">{product.title}</h3>

              <div className="product-pricing">
                <span className="current-price">{product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">{product.originalPrice}</span>
                )}
              </div>

              <button
                className={`add-to-cart ${!product.inStock ? 'disabled' : ''}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering card click
                  handleAddToCart(product);
                }}
                disabled={!product.inStock}
              >
                <span className="button-text">
                  {product.inStock ? '🛒 Add to Cart' : '❌ Out of Stock'}
                </span>
                <div className="button-ripple"></div>
              </button>

              <div className="product-features">
                <span className="feature">✓ Free Shipping</span>
                <span className="feature">✓ 30-Day Return</span>
              </div>
            </div>

            <div className="card-glow"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
