// import React, { useEffect, useState } from "react";
// import { GrView } from "react-icons/gr";
// import "./Products.css";
// import { HiMiniShoppingCart } from "react-icons/hi2";

// const ProductPage = ({ addToCart }) => {
//   const [products, setProducts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         // Initialize quantity for each product to 1
//         const initialQuantities = {};
//         data.forEach((product) => {
//           initialQuantities[product.id] = 1;
//         });
//         setQuantities(initialQuantities);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       });
//   }, []);

//   const handleQuickView = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleAddToCart = (product) => {
//     const quantity = quantities[product.id] || 1;
//     addToCart({ ...product, quantity });
//   };

//   const increaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//   };

//   const decreaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(1, (prev[id] || 1) - 1),
//     }));
//   };

//   return (
//     <section className="home-products">
//       <h2 className="home-products-title">Our <span>Herbal Products</span></h2>

//       {loading ? (
//         <p style={{ textAlign: "center" }}>Loading...</p>
//       ) : (
//         <div className="product-grid-container">
//           {products.map((product) => (
//             <div className="product-card" key={product.id}>
//               <img src={product.image} alt={product.title} />
//               <h3>{product.title.slice(0, 30)}...</h3>
//               <p className="price">₹{(product.price * 83).toFixed(0)}</p>

//               <div className="quantity-controls">
//                 <button onClick={() => decreaseQuantity(product.id)}>-</button>
//                 <span>{quantities[product.id] || 1}</span>
//                 <button onClick={() => increaseQuantity(product.id)}>+</button>
//               </div>

//               <div className="btns">
//                 <button className="cart-btn" onClick={() => handleAddToCart(product)}><HiMiniShoppingCart size={24}/></button>
//                 {/* <button className="cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button> */}
//                 {/* <button className="quick-view-btn" onClick={() => handleQuickView(product)}>View Product</button> */}
//                 <button className="quick-view-btn" onClick={() => handleQuickView(product)}><GrView size={24}/></button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && selectedProduct && (
//         <div className="product-modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="product-modal-box" onClick={(e) => e.stopPropagation()}>
//             <div className="product-modal-title">{selectedProduct.title}🍃</div>

//             <div className="img">
//               <img
//                 className="product-modal-image"
//                 src={selectedProduct.image}
//                 alt={selectedProduct.title}
//               />
//             </div>

//             <div className="product-modal-price">
//               Price: ₹{(selectedProduct.price * 83).toFixed(0)}
//             </div>
//             <div className="product-modal-rating">
//               Rating: ⭐ {selectedProduct.rating.rate} / 5
//             </div>
//             <div className="product-modal-description">{selectedProduct.description}</div>

//             <button className="product-modal-close" onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ProductPage;



// import React, { useEffect, useState } from "react";
// import { GrView } from "react-icons/gr";
// import "./Products.css";
// import { HiMiniShoppingCart } from "react-icons/hi2";

// const ProductPage = ({ addToCart }) => {
//   const [products, setProducts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:8804/alldata") // Your API endpoint
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.data) {
//           setProducts(data.data); // Assuming the product array is inside 'data'
//           // Initialize quantity for each product to 1
//           const initialQuantities = {};
//           data.data.forEach((product) => {
//             initialQuantities[product._id] = 1;
//           });
//           setQuantities(initialQuantities);
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       });
//   }, []);

//   const handleQuickView = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleAddToCart = (product) => {
//     const quantity = quantities[product._id] || 1;
//     addToCart({ ...product, quantity });
//   };

//   const increaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//   };

//   const decreaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(1, (prev[id] || 1) - 1),
//     }));
//   };

//   return (
//     <section className="home-products">
//       <h2 className="home-products-title">Our <span>Herbal Products</span></h2>

//       {loading ? (
//         <p style={{ textAlign: "center" }}>Loading...</p>
//       ) : (
//         <div className="product-grid-container">
//           {products.map((product) => (
//             <div className="product-card" key={product._id}>
//               <img src={product.image_link} alt={product.name} />
//               <h3>{product.name ? product.name.slice(0, 30) + "..." : "Unnamed Product"}</h3> {/* Safeguard with default value */}
//               <p className="price">₹{(product.price * 83).toFixed(0)}</p>

//               <div className="quantity-controls">
//                 <button onClick={() => decreaseQuantity(product._id)}>-</button>
//                 <span>{quantities[product._id] || 1}</span>
//                 <button onClick={() => increaseQuantity(product._id)}>+</button>
//               </div>

//               <div className="btns">
//                 <button className="cart-btn" onClick={() => handleAddToCart(product)}>
//                   <HiMiniShoppingCart size={24}/>
//                 </button>
//                 <button className="quick-view-btn" onClick={() => handleQuickView(product)}>
//                   <GrView size={24}/>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && selectedProduct && (
//         <div className="product-modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="product-modal-box" onClick={(e) => e.stopPropagation()}>
//             <div className="product-modal-title">{selectedProduct.name || "Product"}🍃</div> {/* Handle undefined names */}
//             <div className="img">
//               <img
//                 className="product-modal-image"
//                 src={selectedProduct.image_link}
//                 alt={selectedProduct.name || "Product Image"}
//               />
//             </div>

//             <div className="product-modal-price">
//               Price: ₹{(selectedProduct.price * 83).toFixed(0)}
//             </div>
//             <div className="product-modal-rating">
//               Rating: ⭐ {selectedProduct.rating?.rate || "N/A"} / 5
//             </div>
//             <div className="product-modal-description">{selectedProduct.review || "No description available"}</div>

//             <button className="product-modal-close" onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ProductPage;




// import React, { useEffect, useState } from "react";
// import { GrView } from "react-icons/gr";
// import { HiMiniShoppingCart } from "react-icons/hi2";
// import "./Products.css";

// const ProductPage = ({ addToCart }) => {
//   const [products, setProducts] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:8804/alldata") // Your API endpoint
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.data) {
//           // Flatten the products from all categories
//           const allProducts = data.data.flatMap(item => item.products).filter(product => product._id); // Only include products with valid IDs
//           setProducts(allProducts); // Set all products in state
//           // Initialize quantity for each product to 1
//           const initialQuantities = {};
//           allProducts.forEach((product) => {
//             initialQuantities[product._id] = 1;
//           });
//           setQuantities(initialQuantities);
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       });
//   }, []);

//   const handleQuickView = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleAddToCart = (product) => {
//     const quantity = quantities[product._id] || 1;
//     addToCart({ ...product, quantity });
//   };

//   const increaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//   };

//   const decreaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(1, (prev[id] || 1) - 1),
//     }));
//   };

//   return (
//     <section className="home-products">
//       <h2 className="home-products-title">Our <span>Herbal Products</span></h2>

//       {loading ? (
//         <p style={{ textAlign: "center" }}>Loading...</p>
//       ) : (
//         <div className="product-grid-container">
//           {products.length === 0 ? (
//             <p>No products available.</p>
//           ) : (
//             products.map((product) => (
//               <div className="product-card" key={product._id}>
//                 <img
//                   src={product.image_link || "default-image.jpg"}
//                   alt={product.name || "Unnamed Product"}
//                 />
//                 <h3>{product.name ? product.name.slice(0, 30) + "..." : "Unnamed Product"}</h3> {/* Safeguard with default value */}
//                 <p className="price">₹{(product.price * 83).toFixed(0) || "Not Available"}</p>

//                 <div className="quantity-controls">
//                   <button onClick={() => decreaseQuantity(product._id)}>-</button>
//                   <span>{quantities[product._id] || 1}</span>
//                   <button onClick={() => increaseQuantity(product._id)}>+</button>
//                 </div>

//                 <div className="btns">
//                   <button className="cart-btn" onClick={() => handleAddToCart(product)}>
//                     <HiMiniShoppingCart size={24}/>
//                   </button>
//                   <button className="quick-view-btn" onClick={() => handleQuickView(product)}>
//                     <GrView size={24}/>
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {showModal && selectedProduct && (
//         <div className="product-modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="product-modal-box" onClick={(e) => e.stopPropagation()}>
//             <div className="product-modal-title">{selectedProduct.name || "Product"}🍃</div> {/* Handle undefined names */}
//             <div className="img">
//               <img
//                 className="product-modal-image"
//                 src={selectedProduct.image_link || "default-image.jpg"}
//                 alt={selectedProduct.name || "Product Image"}
//               />
//             </div>

//             <div className="product-modal-price">
//               Price: ₹{(selectedProduct.price * 83).toFixed(0) || "Not Available"}
//             </div>
//             <div className="product-modal-rating">
//               Rating: ⭐ {selectedProduct.rating?.rate || "N/A"} / 5
//             </div>
//             <div className="product-modal-description">{selectedProduct.review || "No description available"}</div>

//             <button className="product-modal-close" onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ProductPage;



import React, { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { HiMiniShoppingCart } from "react-icons/hi2";
import "./Products.css";

const ProductPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://virtual-i6x5.onrender.com/alldata/products"); // Your API endpoint
      const result = await response.json();
      console.log("Raw API response:", result);

      if (Array.isArray(result.data)) {
        setProducts(result.data);
        const initialQuantities = {};
        result.data.forEach(product => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      } else {
        console.error("Unexpected data format. 'data' field missing or not an array:", result);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToCart = (product) => {
    const quantity = quantities?.[product._id] || 1;
    const item = {
      id: product._id,
      name: product.name || "Unnamed Product",
      image: product.image_link || "default-image.jpg",
      price: product.price,
      quantity,
    };
    addToCart(item);
  };
  

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const formatPrice = (price) => {
    const numeric = parseFloat(price?.replace("₹", ""));
    return !isNaN(numeric) ? (numeric * 83).toFixed(0) : "Not Available";
  };
    console.log("products",products)
    
  return (
    <section className="home-products">
      <h2 className="home-products-title">
        Our <span>Herbal Products</span>
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="product-grid-container">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map((product) => {
              const productName = product?.name || "Unnamed Product";
              const truncatedName = productName.length > 30 ? productName.slice(0, 30) + "..." : productName;
              const quantity = quantities?.[product._id] || 1;

              return (
                <div className="product-card" key={product._id}>
                  <img
                    src={product.image_link || "default-image.jpg"}
                    alt={productName}
                  />
                  <h3>{truncatedName}</h3>
                  <p className="price">{(product.price)}</p>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(product._id)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => increaseQuantity(product._id)}>+</button>
                  </div>

                  <div className="btns">
                    <button className="cart-btn" onClick={() => handleAddToCart(product)}>
                      <HiMiniShoppingCart size={24} />
                    </button>
                    <button className="quick-view-btn" onClick={() => handleQuickView(product)}>
                      <GrView size={24} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {showModal && selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="product-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="product-modal-title">
              {selectedProduct.name || "Product"} 🍃
            </div>

            <div className="img">
              <img
                className="product-modal-image"
                src={selectedProduct.image_link || "default-image.jpg"}
                alt={selectedProduct.name || "Product Image"}
              />
            </div>

            <div className="product-modal-price">
              Price: ₹{formatPrice(selectedProduct.price)}
            </div>

            <div className="product-modal-rating">
              Rating: ⭐ {selectedProduct.rating || "N/A"} / 5
            </div>

            <div className="product-modal-description">
              {selectedProduct.review || "No description available"}
            </div>

            <button
              className="product-modal-close"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductPage;




