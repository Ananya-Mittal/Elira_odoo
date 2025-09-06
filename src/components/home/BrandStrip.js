import React, { useState, useEffect } from 'react';
import './BrandStrip.css';

const BrandStrip = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const brands = [
    { name: 'Nike', logo: '✓', color: 'from-orange-400 to-red-500', description: 'Just Do It' },
    { name: 'Apple', logo: '🍎', color: 'from-gray-400 to-gray-600', description: 'Think Different' },
    { name: 'Samsung', logo: '📱', color: 'from-blue-400 to-blue-600', description: 'Innovation' },
    { name: 'Adidas', logo: '👟', color: 'from-green-400 to-teal-500', description: 'Impossible is Nothing' },
    { name: 'Sony', logo: '🎵', color: 'from-purple-400 to-purple-600', description: 'Make Believe' }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % brands.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, brands.length]);

  const handleBrandClick = (brandName) => {
    console.log(`Navigate to brand: ${brandName}`);
    // Add navigation logic here
  };

  return (
    <section className="popular-brands">
      <h2 className="section-title">Popular Brands</h2>
      
      <div 
        className="brands-showcase"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="brands-slider">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={`brand-card ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleBrandClick(brand.name)}
              style={{
                transform: `translateX(${(index - currentSlide) * 100}%)`
              }}
            >
              <div className={`brand-logo bg-gradient-to-r ${brand.color}`}>
                <span className="logo-icon">{brand.logo}</span>
              </div>
              <h3 className="brand-name">{brand.name}</h3>
              <p className="brand-description">{brand.description}</p>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          {brands.map((_, index) => (
            <button
              key={index}
              className={`control-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="brands-grid">
        {brands.map((brand, index) => (
          <div
            key={brand.name}
            className="brand-item"
            onClick={() => handleBrandClick(brand.name)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`brand-icon bg-gradient-to-r ${brand.color}`}>
              <span>{brand.logo}</span>
            </div>
            <span className="brand-text">{brand.name}</span>
            <div className="brand-hover-effect"></div>
          </div>
        ))}
      </div>

      <div className="partnership-banner">
        <div className="banner-content">
          <h3>Trusted by Leading Brands</h3>
          <p>We partner with the world's most innovative companies to bring you quality products</p>
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;
