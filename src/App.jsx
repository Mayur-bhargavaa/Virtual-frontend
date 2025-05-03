import React, { useState ,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import CartContainer from "./components/Cart/CartContainer"; 
import ExplorePlants from "./pages/ExplorePlant/ExplorePlantsPage";
import Blogs from "./pages/Blogs/BlogPage";
import ScrollToTop from "./components/ScrolltoTOp/ScrollToTop";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import Reviews from "./pages/Review/Review";
import Aboutus from "./pages/Aboutus/Aboutus";
import Products from "./pages/Product/Product"
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import Quiz from "./pages/Quiz/Quiz";
import Cart from "./components/Cart/CartContainer";
import ProductDetailPage from "./components/Products/ProductDetailPage";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  

   // ✅ Load cart from localStorage on mount
   useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid cart data", err);
      }
    }
  }, []);


  // ✅ Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);  

  const addToCart = (product) => {
    const normalizedProduct = {
      ...product,
      title: product.title || product.name || "Unnamed Product",
      quantity: product.quantity || 1,
    };
  
    const existingItem = cartItems.find(item => item.id === normalizedProduct.id);
  
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === normalizedProduct.id
          ? { ...item, quantity: item.quantity + normalizedProduct.quantity }
          : item
      );
      setCartItems(updatedItems);
      alert(`${normalizedProduct.title} quantity updated in cart.`);
    } else {
      const confirmed = window.confirm(`Add ${normalizedProduct.quantity} x ${normalizedProduct.title} to your cart?`);
      if (confirmed) {
        setCartItems(prev => [...prev, normalizedProduct]);
        alert("Added to cart!");
      }
    }
  };
  
  
  
  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedItems);
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1 || isNaN(newQuantity)) return;
    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };



  return (
    <>
    <Router>
    <ScrollToTop /> 
      <Navbar toggleSidebar={toggleSidebar} setShowCart={setShowCart} cartItems={cartItems}/>
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}      
      {/* {showCart && ( 
        <CartContainer cartItems={cartItems} onClose={() => setShowCart(false)} removeFromCart={removeFromCart} updateCartItemQuantity={updateCartItemQuantity}/>
      )} */}

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart}/>} />
        <Route path="/explore-plants" element={<ExplorePlants />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/product" element={<Products addToCart={addToCart}/>} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route
          path="/cart"
          element={
            <CartContainer
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateCartItemQuantity={updateCartItemQuantity}
            />
          }
        />
      </Routes>
    </Router>
    
    </>
  );
};

export default App;

