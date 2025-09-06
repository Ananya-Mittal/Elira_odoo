import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Checkout.css";

const Checkout = () => {
  const { cart = [], orders = [], addItemToOrderList, clearCart } = useContext(GlobalContext);
  
  // Constants for the calculation
  const discount = 20; // 20%
  const extraFees = 99;
  const tax = 5;
  
  // Calculate all values with proper error handling
  const subTotal = cart.reduce((sum, curr) => sum + (curr.price || 0), 0);
  const discountAmount = ((subTotal + extraFees + tax) * (discount / 100));
  const total = Math.max(0, Math.floor(subTotal + extraFees + tax - discountAmount));
  
  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePay = async () => {
    if (cart.length === 0 || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Generate a more unique order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const newOrder = {
        orderId,
        buyerId: 1,
        items: [...cart],
        price: total,
        address: "7 Rusk Court",
        orderDate: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        isDelivered: false,
        status: "confirmed"
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addItemToOrderList(newOrder);
      clearCart();
      setIsOrdered(true);
    } catch (error) {
      console.error("Order placement failed:", error);
      // In a real app, you'd show an error message here
    } finally {
      setIsLoading(false);
    }
  };
  
  // If context is not available, show error message
  if (!cart && !orders) {
    return (
      <div className="checkout-container">
        <div className="error-message">
          <h3>Error: Unable to load checkout data</h3>
          <p>Please try refreshing the page or contact support.</p>
          <Link to="/" className="back-to-home">Go to Homepage</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-container">
      {isOrdered ? (
        <div className="order-success">
          <div className="success-icon">🚀</div>
          <h2>Order placed successfully!</h2>
          <p>Your items are on their way.</p>
          <div className="order-details">
            <p>Estimated delivery: 7 days</p>
            <p>Total paid: ${total.toFixed(2)}</p>
          </div>
          <div className="success-actions">
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
            <Link to="/orders" className="view-orders">
              View My Orders
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="checkout-header">
            <h2>Checkout</h2>
            <Link to="/cart" className="edit-cart">Edit Cart</Link>
          </div>
          
          <div className="checkout-section">
            <div className="section-header">
              <h3>Order Review</h3>
              <span className="item-count">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
              </span>
            </div>
            {cart.length > 0 ? (
              <div className="cart-preview">
                {cart.slice(0, 3).map((item, index) => (
                  <div key={index} className="cart-preview-item">
                    <div className="preview-item-image">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                    <div className="preview-item-details">
                      <span className="preview-item-name">{item.name}</span>
                      <span className="preview-item-price">
                        ${(item.price || 0).toFixed(2)}
                      </span>
                      {item.quantity && (
                        <span className="preview-item-quantity">
                          Qty: {item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {cart.length > 3 && (
                  <div className="more-items">
                    +{cart.length - 3} more {cart.length - 3 === 1 ? 'item' : 'items'}
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-cart-message">
                Your cart is empty. <Link to="/">Start shopping</Link>
              </div>
            )}
          </div>
          
          <div className="checkout-section">
            <div className="section-header">
              <h3>Delivery Address</h3>
              <button className="change-address">Change</button>
            </div>
            <div className="address-info">
              <p>7 Rusk Court</p>
              <p>Default delivery address</p>
            </div>
          </div>
          
          <div className="checkout-section">
            <div className="section-header">
              <h3>Coupons & Offers</h3>
              <span className="coupon-status">Apply coupon</span>
            </div>
            <div className="coupon-input">
              <input type="text" placeholder="Enter coupon code" disabled />
              <button disabled>Apply</button>
            </div>
          </div>
          
          <div className="checkout-section">
            <div className="section-header">
              <h3>Payment Summary</h3>
            </div>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({cart.length} items)</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row discount">
                <span>Discount ({discount}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>${extraFees.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax & Service Fee</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="savings-note">
                  You're saving ${discountAmount.toFixed(2)} on this order!
                </div>
              )}
            </div>
          </div>
          
          <div className="checkout-footer">
            <button 
              className={`checkout-btn ${cart.length === 0 || isLoading ? 'disabled' : ''}`} 
              onClick={handlePay}
              disabled={cart.length === 0 || isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">Processing...</span>
              ) : cart.length === 0 ? (
                'Cart is Empty'
              ) : (
                `Place Order • $${total.toFixed(2)}`
              )}
            </button>
            
            <div className="payment-security">
              <span>🔒 Secure payment powered by Stripe</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;