import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSearch, IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { FiAlignJustify } from "react-icons/fi"; // Hamburger icon
import "./Navbar.css";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Track mobile menu visibility

  const [products, setProducts] = useState([]);
  const [plants, setPlants] = useState([]);

  const normalizeString = (str) => {
    return str && typeof str === "string" ? str.replace(/\s+/g, "").toLowerCase() : "";
  };

  const matchedProducts = products
    ?.filter((item) => normalizeString(item.name).includes(normalizeString(searchTerm)))
    .slice(0, 3);

  const matchedPlants = plants
    ?.filter((item) =>
      normalizeString(item.plant?.commonName).includes(normalizeString(searchTerm))
    )
    .slice(0, 2);

  const hasResults = normalizeString(searchTerm).length > 0 &&
    (matchedProducts.length > 0 || matchedPlants.length > 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, plantRes] = await Promise.all([
          fetch("https://virtual-i6x5.onrender.com/alldata/product"),
          fetch("https://virtual-i6x5.onrender.com/alldata/plants"),
        ]);

        const rawProduct = await productRes.clone().text();
        const rawPlant = await plantRes.clone().text();

        const productData = JSON.parse(rawProduct);
        const plantData = JSON.parse(rawPlant);

        const fetchedProducts = Array.isArray(productData.data)
          ? productData.data
          : productData.products || [];
        const fetchedPlants = Array.isArray(plantData.data) ? plantData.data : [];
        setProducts(fetchedProducts);
        setPlants(fetchedPlants);
      } catch (err) {
        console.error("❌ Error fetching or parsing data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle scroll UI effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => setShowSearch((prev) => !prev);

  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);

  return (
    <>
      <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        {/* Top center title */}
        <Link to="/">
          <div className={`navbar-title ${scrolled ? "scrolled" : ""}`}>𝔾𝕣𝕖𝕖𝕟𝔹𝕝𝕠𝕠𝕞</div>
        </Link>


        {/* Bottom area: center nav links + right icons */}
        <div className="navbar-bottom">
          <nav className={`navbar-links ${scrolled ? "scrolled" : ""}`}>
            <Link to="/products">Our Herbal Products</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/remedies">Home Remedies</Link>
            <Link to="/quiz">Play Quiz</Link>
          </nav>
          <div class="navbar-bottom">
          <FiAlignJustify className={`icon-hamburger ${scrolled ? "scrolled" : ""}`} onClick={toggleMobileMenu}/>
          {/* Right-aligned icons */}
          <div className="navbar-icons">
            {showSearch && (
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search herbal products or plants..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            )}

            <span onClick={toggleSearch}>
              {showSearch ? (
                <IoClose className={`icon ${scrolled ? "scrolled" : ""}`} />
              ) : (
                <IoSearch className={`icon ${scrolled ? "scrolled" : ""}`} />
              )}
            </span>

            <Link to="/cart">
              <FiShoppingCart className={`icon ${scrolled ? "scrolled" : ""}`} />
            </Link>
            <Link to="/profile">
              <VscAccount className={`icon ${scrolled ? "scrolled" : ""}`} />
            </Link>
          </div>
        </div>
        </div>
      </header>

      {/* Display search results */}
      {showSearch && hasResults && (
        <div className="search-results">
          <ul>
            {matchedProducts.map((product, index) => (
              <li key={index}>{product.name}</li>
            ))}
          </ul>
          <ul>
            {matchedPlants.length > 0 && (
              <div>
                <ul>
                  {matchedPlants.map((item, index) => {
                    const plantData = item.plant; // Accessing the plant data
                    return (
                      <li key={index}>
                        {plantData.commonName}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </ul>
        </div>
      )}

      {/* If no results */}
      {showSearch && searchTerm && !hasResults && (
        <div className="search-results">No results found for "{searchTerm}"</div>
      )}

      {/* Mobile Menu - Display Categories */}
      {showMobileMenu && (
  <div className="mobile-menu-overlay">
    <div className="mobile-menu-items">
      <Link to="/products" onClick={toggleMobileMenu}>Our Herbal Products</Link>
      <Link to="/aboutus" onClick={toggleMobileMenu}>About Us</Link>
      <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
      <Link to="/remedies" onClick={toggleMobileMenu}>Home Remedies</Link>
      <Link to="/quiz" onClick={toggleMobileMenu}>Play Quiz</Link>
      <span onClick={toggleMobileMenu} className="close-menu">
        Close
      </span>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
