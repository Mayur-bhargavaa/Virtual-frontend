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
    fetch("https://virtual-i6x5.onrender.com/alldata/blogs") // ✅ Make sure this matches your backend
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
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <img src={selectedBlog.mainImage} alt={selectedBlog.title} />
            <h3>{selectedBlog.title}</h3>
            <p><strong>Author:</strong> {selectedBlog.author}</p>
            <p><strong>Date:</strong> {new Date(selectedBlog.date).toDateString()}</p>
            <p><strong>Read Time:</strong> {selectedBlog.readTime}</p>
            <p><strong>Description:</strong> {selectedBlog.description}</p>
            <p><strong>Plants Mentioned:</strong> {selectedBlog.plantsMentioned.join(', ')}</p>
            <p><strong>Usage Tips:</strong> {selectedBlog.usageTips}</p>
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogComponent;
