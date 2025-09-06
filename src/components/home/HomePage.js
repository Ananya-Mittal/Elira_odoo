import React from 'react';
import './HomePage.css';
import HeroBanner from './HeroBanner';
import CategoryBrowser from './CategoryBrowse';
import ProductSection from './ProductSection';
import BrandStrip from './BrandStrip';
import items from "../../mockData/items.json";
import ItemList from "../itemList/ItemList";

const HomePage = () => {
  return (
    <div className="homepage">
      <HeroBanner />
         <div className="hero-section">
        <h1>Welcome to Our Collection</h1>
        <p>Discover our carefully curated items just for you</p>
      </div>
      <section className="home-container">
      <div className="homepage-content">
        <CategoryBrowser />
        <ItemList items={items} />
        <ProductSection />
        <BrandStrip />
      </div>
       </section>
    </div>
  );
};

export default HomePage;




// import React from "react";

// import "./HomePage.css";

// function HomePage() {
//   return (
    
   
//       
   
//   );
// }

// export default HomePage;
