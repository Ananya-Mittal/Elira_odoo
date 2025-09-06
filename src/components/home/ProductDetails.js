// src/components/itemDetail/ItemDetail.js
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import './ItemDetail.css'; // optional styling

const ItemDetail = () => {
  const { id } = useParams(); // get product ID from URL
  const { products, addItemToCartList } = useContext(GlobalContext); // use your function

  // Find the product by id
  const product = products.find((p) => p.id === id);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="item-detail-container">
      <div className="item-detail-card">
        <div className="item-icon">{product.icon}</div>
        <h2>{product.title}</h2>
        <p className="price">Price: {product.price}</p>
        {product.originalPrice && (
          <p className="original-price">Original: {product.originalPrice}</p>
        )}
        {product.discount && <p className="discount">Discount: {product.discount}</p>}
        <p>Rating: {product.rating} ({product.reviews} reviews)</p>
        <p>{product.inStock ? "In Stock ✅" : "Out of Stock ❌"}</p>
        <button
          className="add-to-cart-btn"
          onClick={() => addItemToCartList(product)} // ✅ use your existing function
          disabled={!product.inStock}
        >
          {product.inStock ? "🛒 Add to Cart" : "❌ Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;
