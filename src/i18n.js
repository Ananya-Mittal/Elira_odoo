import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to ELIRA",
      language: "Language",
      cart: "Cart",
      wishlist: "Wishlist",
      digitalLearning: "Digital Learning",
      getApp: "Get App",
      orders: "Orders",
      dashboard: "Dashboard",
      products: "Products",
      analytics: "Analytics",
      account: "Account",
      hi: "Hi",
      myProfile: "My Profile",
      myOrders: "My Orders",
      sellerPortal: "Seller Portal",
      customerView: "Customer View",
      logout: "Logout",
      login: "Login",
      signup: "Sign Up",
      trackOrder: "Track Order",
      help: "Help & Support",
      areYouSeller: "Are you a seller?",
      sellerLogin: "Seller Login",
      becomeSeller: "Become a Seller",
    },
  },
  hi: {
    translation: {
      welcome: "एलिरा में आपका स्वागत है",
      language: "भाषा",
      cart: "कार्ट",
      wishlist: "इच्छा सूची",
      digitalLearning: "डिजिटल लर्निंग",
      getApp: "ऐप डाउनलोड करें",
      orders: "ऑर्डर",
      dashboard: "डैशबोर्ड",
      products: "उत्पाद",
      analytics: "विश्लेषण",
      account: "खाता",
      hi: "नमस्ते",
      myProfile: "मेरा प्रोफ़ाइल",
      myOrders: "मेरे ऑर्डर",
      sellerPortal: "विक्रेता पोर्टल",
      customerView: "ग्राहक दृश्य",
      logout: "लॉगआउट",
      login: "लॉगिन",
      signup: "साइन अप",
      trackOrder: "ऑर्डर ट्रैक करें",
      help: "सहायता",
      areYouSeller: "क्या आप विक्रेता हैं?",
      sellerLogin: "विक्रेता लॉगिन",
      becomeSeller: "विक्रेता बनें",
    },
  },
  // Add more languages here...
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
