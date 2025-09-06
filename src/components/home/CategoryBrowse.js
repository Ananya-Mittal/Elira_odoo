import React, { useState } from 'react';
import './CategoryBrowse.css';  // ✅ Import external CSS

const CategoryBrowser = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    { id: 'electronics', title: 'Electronics', icon: '📱', description: 'Latest gadgets & tech' },
    { id: 'fashion', title: 'Fashion', icon: '👕', description: 'Trendy clothing & accessories' },
    { id: 'home-living', title: 'Home & Living', icon: '🏠', description: 'Beautiful home essentials' },
    { id: 'books', title: 'Books', icon: '📚', description: 'Knowledge & entertainment' }
  ];

  const handleCategoryClick = (categoryId) => {
    console.log(`Navigate to category: ${categoryId}`);
  };

  return (
    <section className="browse-categories">
      <h2 className="section-title">Browse Categories</h2>
      <div className="categories-row">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`category-card ${hoveredCategory === category.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => handleCategoryClick(category.id)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="category-icon">
              <span className="icon-emoji">{category.icon}</span>
            </div>
            <h3 className="category-title">{category.title}</h3>
            <p className="category-description">{category.description}</p>
            <div className="category-arrow"><span>→</span></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBrowser;
