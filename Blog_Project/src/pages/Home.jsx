
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { getAllBlogs, deleteBlog } from "../api/blogApi";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data || []);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.BlogTitle
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || blog.Category === category;

    return matchesSearch && matchesCategory;
  });

  const isOwner = (blog) =>
    blog.Author?.Email?.toLowerCase().trim() ===
    user?.Email?.toLowerCase().trim();

  return (
    <div className="home-page">
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <span className="hero-tag">WELCOME TO BLOGSPACE</span>

              <h1>
                Ideas worth
                <span> sharing.</span>
              </h1>

              <p>
                Discover interesting stories, explore new ideas and
                share your knowledge with the world.
              </p>

              <div className="hero-buttons">
                <a href="#blogs" className="btn hero-btn">
                  Explore Blogs
                </a>

                {user && (
                  <Link to="/add-blog" className="btn create-btn">
                    + Create Blog
                  </Link>
                )}
              </div>
            </Col>

            <Col lg={5} className="hero-image-column">
              <div className="hero-image">
                <div className="hero-image-content">
                  <span>READ. WRITE. INSPIRE.</span>
                  <h3>Your Story Starts Here.</h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="blog-container" id="blogs">
        <div className="section-heading">
          <div>
            <span className="section-label">OUR COLLECTION</span>
            <h2>Explore Latest Blogs</h2>
            <p>Stories and ideas from our community.</p>
          </div>

          {user && (
            <Link to="/add-blog" className="add-blog-link">
              + Write a Blog
            </Link>
          )}
        </div>

        <Row className="filter-row align-items-center">
          <Col md={6} className="mb-3">
            <Form.Control
              type="search"
              placeholder="Search blogs by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </Col>

          <Col md={6} className="mb-3">
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="All">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Politics">Politics</option>
            </Form.Select>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading blogs...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="empty-state">
            <h4>No Blogs Found</h4>
            <p>Try another search or category.</p>
          </div>
        ) : (
          <Row>
            {filteredBlogs.map((blog) => (
              <Col lg={4} md={6} key={blog._id} className="mb-4">
                <Card className="blog-card h-100">
                  <div className="blog-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={blog.BlogImg}
                      alt={blog.BlogTitle}
                      className="blog-image"
                    />
                    <span className="blog-category">
                      {blog.Category}
                    </span>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <div className="blog-author">
                      By {blog.Author?.Name || "Unknown Author"}
                    </div>

                    <Card.Title className="blog-title">
                      {blog.BlogTitle}
                    </Card.Title>

                    <Card.Text className="blog-description">
                      {blog.Content?.length > 120
                        ? `${blog.Content.substring(0, 120)}...`
                        : blog.Content}
                    </Card.Text>

                    <div className="mt-auto">
                      <Link
                        to={`/blog/${blog._id}`}
                        className="read-more"
                      >
                        Read More →
                      </Link>

                      {user && isOwner(blog) && (
                        <div className="blog-actions mt-3">
                          <Link
                            to={`/edit-blog/${blog._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Edit
                          </Link>

                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(blog._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <footer className="home-footer">
        <Container>
          <h4>BlogSpace</h4>
          <p>Share your thoughts. Inspire the world.</p>
          <span>© 2026 BlogSpace. All rights reserved.</span>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
