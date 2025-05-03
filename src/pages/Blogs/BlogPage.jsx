import React, { useEffect, useState } from "react";
import "./BlogPage.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        // 🔥 Map API response into full Blog structure
        const formattedBlogs = data.map((item, index) => ({
          id: item.id,
          title: item.title,
          author: "GreenBloom Author", // Fake Author
          date: item.date || new Date().toISOString(), // Use API date if available or fallback to current date
          tags: ["Gardening", "Plants", "Green Tips"], // Example tags
          thumbnail: item.image || "https://via.placeholder.com/300x200",
          mainimage: item.mainimage || "https://via.placeholder.com/300x200",
          excerpt: item.description.slice(0, 100) + "...", // First 100 chars
          readTime: Math.floor(Math.random() * 5 + 3) + " min", // Random read time between 3-8 min
          description: item.description, // Full description
          plantsMentioned: ["Aloe Vera", "Mint", "Basil"], // Example plants
          usageTips: "Water regularly and provide good sunlight.", // Example usage tips
        }));

        setBlogs(formattedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Open blog detail modal
  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setShowDetail(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  // Close modal
  const closeDetail = () => {
    setSelectedBlog(null);
    setShowDetail(false);
    document.body.style.overflow = "auto"; // Re-enable scroll
  };

  return (
    <section className="blog-page" id="blogPage">
      <h2 className="section-title">GreenBloom <span>Blogs</span></h2>

      {/* Blog List - Showing only thumbnail, title, and date */}
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <div className="blog-image">
              <img
                src={blog.thumbnail}
                alt={blog.title}
              />
            </div>
            <div className="blog-details">
              <h3 className="blog-title">
                {blog.title.length > 30 ? blog.title.slice(0, 30) + "..." : blog.title}
              </h3>
              <div className="blog-meta">
                <span>🖊 {blog.author}</span> |{" "}
                <span>📅 {new Date(blog.date).toLocaleDateString()}</span> {/* Use API date */}
              </div>
              <button onClick={() => handleReadMore(blog)} className="read-more-btn">
                Read More 📖
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Detail Modal - Only visible when clicking "Read More" */}
      {showDetail && selectedBlog && (
        <div className="modal-overlay" onClick={closeDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeDetail}>X</button>
            <h2>{selectedBlog.title}</h2>
            <div className="modal-meta">
              <span>🖊 {selectedBlog.author}</span> |{" "}
              <span>🕒 {selectedBlog.readTime}</span> |{" "}
              <span>📅 {new Date(selectedBlog.date).toLocaleDateString()}</span>
            </div>
            <div className="modal-body">
              <div className="main-image-container">
                <img
                  src={selectedBlog.mainimage}
                  alt={selectedBlog.title}
                  className="main-image"
                />
              </div>

              <p>{selectedBlog.description}</p>

              <h4>🌿 Plants Mentioned:</h4>
              <ul>
                {selectedBlog.plantsMentioned.map((plant, idx) => (
                  <li key={idx}>{plant}</li>
                ))}
              </ul>

              <h4>💡 Usage Tips:</h4>
              <p>{selectedBlog.usageTips}</p>

              {/* Optional Tags */}
              {selectedBlog.tags && (
                <div className="tags-container">
                  {selectedBlog.tags.map((tag, idx) => (
                    <span key={idx} className="tag-badge">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogPage;
