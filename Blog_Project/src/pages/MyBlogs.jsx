
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { getAllBlogs, deleteBlog } from "../api/blogApi";
import { useAuth } from "../context/AuthContext";
import "./MyBlogs.css";

const MyBlogs = () => {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const allBlogs = await getAllBlogs();

        const myBlogs = allBlogs.filter(
          (blog) =>
            blog.Author?.Email?.toLowerCase().trim() ===
            user?.Email?.toLowerCase().trim()
        );

        setBlogs(myBlogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.Email) {
      fetchMyBlogs();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBlog(id);

      setBlogs((prev) =>
        prev.filter((blog) => blog._id !== id)
      );

      alert("Blog deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading your blogs...</p>
      </div>
    );
  }

  return (
    <div className="my-blogs-page">
      <Container className="py-5">
        <div className="my-blogs-heading">
          <div>
            <span className="section-label">YOUR COLLECTION</span>
            <h2>My Blogs</h2>
            <p>Manage all the blogs you have created.</p>
          </div>

          <Link to="/add-blog" className="btn btn-primary">
            + Create New Blog
          </Link>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!error && blogs.length === 0 ? (
          <div className="empty-my-blogs">
            <h4>You haven't created any blogs yet.</h4>
            <p>Start writing and share your thoughts with everyone.</p>
            <Link to="/add-blog" className="btn btn-primary">
              Create Your First Blog
            </Link>
          </div>
        ) : (
          <Row>
            {blogs.map((blog) => (
              <Col lg={4} md={6} key={blog._id} className="mb-4">
                <Card className="my-blog-card h-100">
                  <Card.Img
                    variant="top"
                    src={blog.BlogImg}
                    alt={blog.BlogTitle}
                  />

                  <Card.Body className="d-flex flex-column">
                    <span className="my-blog-category">
                      {blog.Category}
                    </span>

                    <Card.Title className="mt-3">
                      {blog.BlogTitle}
                    </Card.Title>

                    <Card.Text className="text-secondary">
                      {blog.Content?.length > 110
                        ? `${blog.Content.substring(0, 110)}...`
                        : blog.Content}
                    </Card.Text>

                    <div className="mt-auto d-flex gap-2 flex-wrap">
                      <Link
                        to={`/blog/${blog._id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View
                      </Link>

                      <Link
                        to={`/edit-blog/${blog._id}`}
                        className="btn btn-outline-warning btn-sm"
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
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyBlogs;
