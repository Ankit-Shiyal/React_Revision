import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import { getAllBlogs } from "../api/blogApi";

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const blogs = await getAllBlogs();

        const selectedBlog = blogs.find(
          (item) => item._id === id
        );

        if (!selectedBlog) {
          setError("Blog not found");
          return;
        }

        setBlog(selectedBlog);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading Blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Card className="shadow mx-auto" style={{ maxWidth: "900px" }}>
        <Card.Img
          variant="top"
          src={blog.BlogImg}
          style={{
            height: "400px",
            objectFit: "cover",
          }}
        />

        <Card.Body className="p-4">
          <span className="badge bg-primary mb-3">
            {blog.Category}
          </span>

          <h1 className="mb-3">{blog.BlogTitle}</h1>

          <p className="text-muted">
            Author: {blog.Author?.Name || "Unknown"}
          </p>

          <hr />

          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8" }}>
            {blog.Content}
          </div>

          <div className="mt-4">
            <Button as={Link} to="/" variant="primary">
              Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogDetails;