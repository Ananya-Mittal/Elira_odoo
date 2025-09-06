import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Star, Eye, Share2 } from 'lucide-react';
import "./Wishlist.css"
const Wishlist = () => {
  // Mock wishlist data - in real app, this would come from context/API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      brand: "AudioTech",
      originalPrice: 299.99,
      discountPrice: 199.99,
      discount: 33,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 1234,
      inStock: true,
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      brand: "FitTracker Pro",
      originalPrice: 399.99,
      discountPrice: 299.99,
      discount: 25,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.2,
      reviewCount: 856,
      inStock: true,
      addedDate: "2024-01-20"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      brand: "EcoWear",
      originalPrice: 49.99,
      discountPrice: 34.99,
      discount: 30,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 432,
      inStock: false,
      addedDate: "2024-01-25"
    },
    {
      id: 4,
      name: "Professional Camera Lens",
      brand: "LensMax",
      originalPrice: 899.99,
      discountPrice: 699.99,
      discount: 22,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 267,
      inStock: true,
      addedDate: "2024-02-01"
    },
    {
      id: 5,
      name: "Minimalist Desk Lamp",
      brand: "LightCraft",
      originalPrice: 129.99,
      discountPrice: 89.99,
      discount: 31,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 189,
      inStock: true,
      addedDate: "2024-02-05"
    },
    {
      id: 6,
      name: "Leather Crossbody Bag",
      brand: "StyleCraft",
      originalPrice: 179.99,
      discountPrice: 124.99,
      discount: 31,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 543,
      inStock: true,
      addedDate: "2024-02-08"
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const moveToCart = (itemId) => {
    // In real app, this would add to cart context
    console.log('Moving to cart:', itemId);
    removeFromWishlist(itemId);
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAll = () => {
    setSelectedItems(wishlistItems.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const removeSelected = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const moveSelectedToCart = () => {
    selectedItems.forEach(itemId => moveToCart(itemId));
  };

  const shareWishlist = () => {
    // In real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.href);
    alert('Wishlist link copied to clipboard!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const WishlistItem = ({ item, isSelected, onToggleSelect }) => (
    <div className={`wishlist-item ${viewMode} ${!item.inStock ? 'out-of-stock' : ''}`}>
      <div className="item-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(item.id)}
          aria-label={`Select ${item.name}`}
        />
      </div>

      <div className="item-image-container">
        <img src={item.image} alt={item.name} className="item-image" />
        {item.discount > 0 && (
          <div className="discount-badge">-{item.discount}%</div>
        )}
        {!item.inStock && (
          <div className="stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
        <div className="item-overlay">
          <button className="overlay-btn" title="Quick View">
            <Eye size={16} />
          </button>
          <button className="overlay-btn" title="Share">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      <div className="item-details">
        <div className="item-brand">{item.brand}</div>
        <h3 className="item-name">
          <a href={`/product/${item.id}`}>{item.name}</a>
        </h3>
        
        <div className="item-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(item.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-text">{item.rating} ({item.reviewCount})</span>
        </div>

        <div className="item-pricing">
          <span className="current-price">${item.discountPrice}</span>
          {item.originalPrice > item.discountPrice && (
            <span className="original-price">${item.originalPrice}</span>
          )}
        </div>

        <div className="item-meta">
          <span className="added-date">Added {formatDate(item.addedDate)}</span>
          <span className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="item-actions">
          <button
            className="btn btn-primary"
            onClick={() => moveToCart(item.id)}
            disabled={!item.inStock}
          >
            <ShoppingCart size={16} />
            {item.inStock ? 'Add to Cart' : 'Notify Me'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => removeFromWishlist(item.id)}
            title="Remove from wishlist"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-empty">
          <div className="empty-icon">
            <Heart size={64} />
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Save items you love for later. Start browsing and add items to your wishlist.</p>
          <a href="/" className="btn btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <div className="header-left">
          <h1>My Wishlist</h1>
          <span className="item-count">{wishlistItems.length} items</span>
        </div>
        
        <div className="header-actions">
          <button className="btn btn-outline" onClick={shareWishlist}>
            <Share2 size={16} />
            Share Wishlist
          </button>
          
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1"/>
                <rect x="9" y="1" width="6" height="6" rx="1"/>
                <rect x="1" y="9" width="6" height="6" rx="1"/>
                <rect x="9" y="9" width="6" height="6" rx="1"/>
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="2" width="14" height="2" rx="1"/>
                <rect x="1" y="6" width="14" height="2" rx="1"/>
                <rect x="1" y="10" width="14" height="2" rx="1"/>
                <rect x="1" y="14" width="14" height="2" rx="1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="bulk-actions">
          <div className="selection-info">
            <span>{selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected</span>
            <button className="link-btn" onClick={clearSelection}>Clear selection</button>
          </div>
          <div className="bulk-buttons">
            <button className="btn btn-primary" onClick={moveSelectedToCart}>
              <ShoppingCart size={16} />
              Move to Cart
            </button>
            <button className="btn btn-danger" onClick={removeSelected}>
              <Trash2 size={16} />
              Remove Selected
            </button>
          </div>
        </div>
      )}

      <div className="selection-controls">
        <label className="select-all">
          <input
            type="checkbox"
            checked={selectedItems.length === wishlistItems.length}
            onChange={selectedItems.length === wishlistItems.length ? clearSelection : selectAll}
          />
          Select All
        </label>
      </div>

      <div className={`wishlist-grid ${viewMode}`}>
        {wishlistItems.map(item => (
          <WishlistItem
            key={item.id}
            item={item}
            isSelected={selectedItems.includes(item.id)}
            onToggleSelect={toggleSelectItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;