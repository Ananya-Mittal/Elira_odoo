import React, { useContext, useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { cart = [], user, isAuthenticated, logout } = useContext(GlobalContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  const { t, i18n } = useTranslation();

  // Language options configuration
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
  ];

  // Detect seller portal
  useEffect(() => {
    setIsSeller(location.pathname.includes("/seller"));
  }, [location.pathname]);

  // Toggle functions with useCallback to prevent unnecessary re-renders
  const toggleDropdown = useCallback(() => {
    setShowDropdown(prev => !prev);
    setShowLanguageDropdown(false); // Close language dropdown when opening user dropdown
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(prev => !prev);
    setShowDropdown(false); // Close dropdowns when opening mobile menu
    setShowLanguageDropdown(false);
  }, []);

  const toggleLanguageDropdown = useCallback(() => {
    setShowLanguageDropdown(prev => !prev);
    setShowDropdown(false); // Close user dropdown when opening language dropdown
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setShowDropdown(false);
    setShowLanguageDropdown(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      closeAllDropdowns();
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error (show notification, etc.)
    }
  }, [logout, closeAllDropdowns]);

  // Close dropdowns on outside click with improved logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isUserDropdownClick = dropdownRef.current?.contains(event.target);
      const isLanguageDropdownClick = languageDropdownRef.current?.contains(event.target);
      
      if (!isUserDropdownClick && !isLanguageDropdownClick) {
        closeAllDropdowns();
      }
    };

    if (showDropdown || showLanguageDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showDropdown, showLanguageDropdown, closeAllDropdowns]);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
    closeAllDropdowns();
  }, [location.pathname, closeAllDropdowns]);

  // Load saved language from localStorage with error handling
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("lang");
      if (savedLang && languages.some(lang => lang.code === savedLang)) {
        i18n.changeLanguage(savedLang);
      }
    } catch (error) {
      console.warn('Failed to load saved language:', error);
    }
  }, [i18n]);

  const changeLanguage = useCallback((lng) => {
    try {
      i18n.changeLanguage(lng);
      localStorage.setItem("lang", lng);
      setShowLanguageDropdown(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [i18n]);

  // Get current language display name
  const getCurrentLanguage = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    return currentLang?.nativeName || 'Language';
  };

  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback((event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
    if (event.key === 'Escape') {
      closeAllDropdowns();
    }
  }, [closeAllDropdowns]);

  const renderUserDropdown = () => (
    <div className="profile-dropdown" role="menu">
      {isAuthenticated ? (
        <>
          <div className="dropdown-user-info">
            <i className="fas fa-user-circle dropdown-user-icon" aria-hidden="true"></i>
            <div className="dropdown-user-details">
              <span className="dropdown-user-name">
                {user?.firstName || 'User'} {user?.lastName || ''}
              </span>
              <span className="dropdown-user-email">{user?.email}</span>
            </div>
          </div>
          <div className="dropdown-divider" />
          <Link 
            to="/profile" 
            className="dropdown-item" 
            onClick={closeAllDropdowns}
            role="menuitem"
          >
            <i className="fas fa-user" aria-hidden="true"></i> {t("myProfile")}
          </Link>
          <Link 
            to="/orders" 
            className="dropdown-item" 
            onClick={closeAllDropdowns}
            role="menuitem"
          >
            <i className="fas fa-box" aria-hidden="true"></i> {t("myOrders")}
          </Link>
          {!isSeller ? (
            <Link 
              to="/seller/login" 
              className="dropdown-item" 
              onClick={closeAllDropdowns}
              role="menuitem"
            >
              <i className="fas fa-store" aria-hidden="true"></i> {t("sellerPortal")}
            </Link>
          ) : (
            <Link 
              to="/" 
              className="dropdown-item" 
              onClick={closeAllDropdowns}
              role="menuitem"
            >
              <i className="fas fa-shopping-bag" aria-hidden="true"></i> {t("customerView")}
            </Link>
          )}
          <div className="dropdown-divider" />
          <button 
            className="dropdown-item logout" 
            onClick={handleLogout}
            role="menuitem"
          >
            <i className="fas fa-sign-out-alt" aria-hidden="true"></i> {t("logout")}
          </button>
        </>
      ) : (
        <>
          <div className="dropdown-header">{t("welcome")}</div>
          <div className="auth-buttons">
            <Link 
              to="/login" 
              className="dropdown-auth-btn login-btn" 
              onClick={closeAllDropdowns}
            >
              {t("login")}
            </Link>
            <Link 
              to="/signup" 
              className="dropdown-auth-btn signup-btn" 
              onClick={closeAllDropdowns}
            >
              {t("signup")}
            </Link>
          </div>
          <div className="dropdown-divider" />
          <Link 
            to="/orders" 
            className="dropdown-item" 
            onClick={closeAllDropdowns}
            role="menuitem"
          >
            <i className="fas fa-box" aria-hidden="true"></i> {t("trackOrder")}
          </Link>
          <Link 
            to="/help" 
            className="dropdown-item" 
            onClick={closeAllDropdowns}
            role="menuitem"
          >
            <i className="fas fa-question-circle" aria-hidden="true"></i> {t("help")}
          </Link>
          <div className="dropdown-divider" />
          <div className="dropdown-seller-section">
            <span className="dropdown-seller-title">{t("areYouSeller")}</span>
            <div className="seller-auth-links">
              <Link 
                to="/seller/login" 
                className="seller-link" 
                onClick={closeAllDropdowns}
              >
                {t("sellerLogin")}
              </Link>
              <span className="seller-divider">|</span>
              <Link 
                to="/seller/signup" 
                className="seller-link" 
                onClick={closeAllDropdowns}
              >
                {t("becomeSeller")}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderLanguageDropdown = () => (
    <div className="dropdown-menu" role="menu">
      {languages.map(({ code, nativeName }) => (
        <button 
          key={code}
          onClick={() => changeLanguage(code)} 
          className={`dropdown-item ${i18n.language === code ? 'active' : ''}`}
          role="menuitem"
          aria-pressed={i18n.language === code}
        >
          {nativeName}
        </button>
      ))}
    </div>
  );

  return (
    <nav className={`navbar ${isSeller ? "seller-navbar" : ""}`} role="navigation">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="ELIRA Home">
          <span className="logo-text">ELIRA</span>
          {isSeller && <span className="seller-badge">{t("sellerPortal")}</span>}
        </Link>

        {/* Links */}
        <div className={`navbar-links ${showMobileMenu ? "active" : ""}`}>
          {!isSeller ? (
            <>
              {/* Language Selector */}
              <div className="nav-item dropdown" ref={languageDropdownRef}>
                <button 
                  className="nav-link dropdown-toggle"
                  onClick={toggleLanguageDropdown}
                  onKeyDown={(e) => handleKeyDown(e, toggleLanguageDropdown)}
                  aria-expanded={showLanguageDropdown}
                  aria-haspopup="true"
                  aria-label={t("language")}
                >
                  <i className="fas fa-globe" aria-hidden="true"></i>
                  <span>{getCurrentLanguage()}</span>
                </button>
                {showLanguageDropdown && renderLanguageDropdown()}
              </div>

              {/* Wishlist */}
              <div className="nav-item">
                <Link to="/Wishlist" className="nav-link" aria-label={t("Wishlist")}>
                  <i className="fas fa-heart" aria-hidden="true"></i>
                  <span>{t("Wishlist")}</span>
                </Link>
              </div>

              {/* Digital Learning */}
              <div className="nav-item">
                <Link to="/digitalLearning" className="nav-link" aria-label={t("digitalLearning")}>
                  <i className="fas fa-book-reader" aria-hidden="true"></i>
                  <span>{t("digitalLearning")}</span>
                </Link>
              </div>

            
              {/* Cart */}
              <div className="nav-item">
                <Link 
                  to="/cart" 
                  className="nav-link cart-link"
                  aria-label={`${t("cart")} (${cart.length} items)`}
                >
                  <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                  <span>{t("cart")} ({cart.length})</span>
                  {cart.length > 0 && (
                    <span 
                      className="cart-notification" 
                      aria-label={`${cart.length} items in cart`}
                    />
                  )}
                </Link>
              </div>

              {/* Orders */}
              <div className="nav-item">
                <Link to="/orders" className="nav-link" aria-label={t("orders")}>
                  <i className="fas fa-box" aria-hidden="true"></i>
                  <span>{t("orders")}</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Seller Links */}
              <div className="nav-item">
                <Link to="/seller/SellerDashboard" className="nav-link" aria-label={t("dashboard")}>
                  <i className="fas fa-tachometer-alt" aria-hidden="true"></i>
                  <span>{t("dashboard")}</span>
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/seller/products" className="nav-link" aria-label={t("products")}>
                  <i className="fas fa-box-open" aria-hidden="true"></i>
                  <span>{t("products")}</span>
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/seller/orders" className="nav-link" aria-label={t("orders")}>
                  <i className="fas fa-shopping-bag" aria-hidden="true"></i>
                  <span>{t("orders")}</span>
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/seller/analytics" className="nav-link" aria-label={t("analytics")}>
                  <i className="fas fa-chart-line" aria-hidden="true"></i>
                  <span>{t("analytics")}</span>
                </Link>
              </div>
            </>
          )}
            {/* Get App */}
              <div className="nav-item">
                <Link to="/app" className="nav-link" aria-label={t("getApp")}>
                  <i className="fas fa-mobile-alt" aria-hidden="true"></i>
                  <span>{t("getApp")}</span>
                </Link>
              </div>


          {/* User Profile */}
          <div className="nav-item user-profile" ref={dropdownRef}>
            <button 
              className="nav-link profile-toggle"
              onClick={toggleDropdown}
              onKeyDown={(e) => handleKeyDown(e, toggleDropdown)}
              aria-expanded={showDropdown}
              aria-haspopup="true"
              aria-label={isAuthenticated ? `Account menu for ${user?.firstName || 'User'}` : 'Account menu'}
            >
              <i className="fas fa-user-circle" aria-hidden="true"></i>
              <span>
                {isAuthenticated ? `${t("hi")}, ${user?.firstName || "User"}` : t("account")}
              </span>
            </button>

            {showDropdown && renderUserDropdown()}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-mobile-toggle" 
          onClick={toggleMobileMenu}
          onKeyDown={(e) => handleKeyDown(e, toggleMobileMenu)}
          aria-expanded={showMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${showMobileMenu ? "fa-times" : "fa-bars"}`} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;