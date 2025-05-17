// import React from 'react'
// import { useState, useEffect} from 'react';
// import './BlogComponent.css'
// import { Link } from "react-router-dom";
// const BlogComponent = () => {

//     const [blogData, setBlogData] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedBlog, setSelectedBlog] = useState(null);

//       useEffect(() => {
//         fetch("https://fakestoreapi.com/products?limit=5")
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data);
//             setBlogData(data);
            
//           })
//           .catch((err) => {
//             console.error("Error fetching blogs:", err);
//           });
//       }, []);
    
      
//   const handleQuickView = (blog) => {
//     setSelectedBlog(blog);
//     setShowModal(true);
//   };

//   return (
//     <>
//         <section className="home-blogs" id="blogs">
//       <h2 className="home-blogs-title">Explore <span>Our Blogs</span></h2>

//       <div className="blogs-scroll-container">
//         {blogData.map((blog, index) => (
//           <div className="blog-card" key={index}>
//             <img src={blog.image} alt={blog.title} />
//             <h3>{blog.title}</h3>
//             <div className="btns">
//               <button className="quick-view-btn-blog" onClick={() => handleQuickView(blog)}>Read More</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="explore-more-container-blog">
//         <Link to="/blogs" className="explore-more-btn-blog">More</Link>
//       </div>

//       {showModal && selectedBlog && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal-box" onClick={(e) => e.stopPropagation()}>
//             <img src={selectedBlog.image} alt={selectedBlog.title} />
//             <h3>{selectedBlog.title}</h3>
//             <p className="price">₹{Math.floor(selectedBlog.price * 83)}</p>
//             <p className="rating">Rating: ⭐ {selectedBlog.rating?.rate}</p>
//             <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </section>
//     </>
//   )
// }

// export default BlogComponent



import React, { useState, useEffect } from 'react';
import './BlogComponent.css';
import { Link } from "react-router-dom";

const BlogComponent = () => {
  const [blogData, setBlogData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8802/alldata/blogs") // ✅ Make sure this matches your backend
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setBlogData(data.data); // ✅ Access data field
        } else {
          console.error("Invalid blog data format:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      });
  }, []);

  const handleQuickView = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  return (
    <section className="home-blogs" id="blogs">
    <h2 className="home-blogs-title">Explore Our Blogs </h2>
  
    <div className="top-two-blogs">
      {blogData.slice(0, 2).map((blog, index) => (
        <div className="top-card" key={index}>
          <img src={blog.thumbnail} alt={blog.title} />
          <h3>{blog.title}</h3>
          <p className="excerpt">{blog.excerpt}</p>
          <p className="author">By {blog.author}</p>
          <p className="date">{new Date(blog.date).toDateString()}</p>
          <button className="quick-view-btn-blog" onClick={() => handleQuickView(blog)}>Read More</button>
        </div>
      ))}
    </div>
  
    <div className="bottom-three-blogs">
      {blogData.slice(2, 5).map((blog, index) => (
        <div className="large-card" key={index}>
          <img src={blog.thumbnail} alt={blog.title} />
          <h3>{blog.title}</h3>
          <p className="excerpt">{blog.excerpt}</p>
          <p className="author">By {blog.author}</p>
          <p className="date">{new Date(blog.date).toDateString()}</p>
          <button className="quick-view-btn-blog" onClick={() => handleQuickView(blog)}>Read More</button>
        </div>
      ))}
    </div>
  

      {/* <div className="explore-more-container-blog">
        <Link to="/blogs" className="explore-more-btn-blog">More</Link>
      </div> */}

     {showModal && selectedBlog && (
  <div className="modal-overlay" onClick={() => setShowModal(false)}>
    <div className="modal-glass-container" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close-btn" onClick={() => setShowModal(false)}>×</button>

      <div className="modal-grid-images">
        <div className="image-box image-thumbnail">
          <img src={selectedBlog.thumbnail} alt="Thumbnail" />
          <div className="image-label">Thumbnail</div>
        </div>
        <div className="image-box image-main">
          <img src={selectedBlog.mainImage || selectedBlog.mainimage} alt="Main" />
          <div className="image-label">Main Image</div>
        </div>
      </div>

      <h2 className="modal-title">{selectedBlog.title}</h2>
      <div className="modal-meta-info">
        <span>🖊 {selectedBlog.author}</span> |{" "}
        <span>🕒 {selectedBlog.readTime}</span> |{" "}
        <span>📅 {new Date(selectedBlog.date).toDateString()}</span>
      </div>

      <p className="modal-description">{selectedBlog.description}</p>

      <div className="modal-section">
        <h4>🌿 Plants Mentioned</h4>
        <ul className="plant-list">
          {selectedBlog.plantsMentioned.map((plant, idx) => (
            <li key={idx}>🌱 {plant}</li>
          ))}
        </ul>
      </div>

      <div className="modal-section usage-tips">
        <h4>💡 Usage Tips</h4>
        <p>{selectedBlog.usageTips}</p>
      </div>

      <div className="modal-section">
        <h4>🏷 Tags</h4>
        <div className="tag-list">
          {selectedBlog.tags.map((tag, idx) => (
            <span key={idx} className="tag-item">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
)}


    </section>
  );
};

export default BlogComponent;
