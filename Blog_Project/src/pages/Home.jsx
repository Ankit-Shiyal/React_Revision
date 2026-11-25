import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { getAllBlogs, deleteBlog } from "../api/blogApi";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { user } = useAuth();

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAllBlogs();
            setBlogs(data);
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

            setBlogs((prevBlogs) =>
                prevBlogs.filter((blog) => blog._id !== id)
            );

            alert("Blog deleted successfully");
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
                <p>Loading Blogs...</p>
            </div>
        );
    }

    return (
        <Container className="mt-5 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Latest Blogs</h2>

                {user && (
                    <Link to="/add-blog" className="btn btn-primary">
                        Add New Blog
                    </Link>
                )}
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {!error && blogs.length === 0 && (
                <h4 className="text-center text-muted">No Blogs Found</h4>
            )}

            <Row>
                {blogs.map((blog) => (
                    <Col lg={4} md={6} className="mb-4" key={blog._id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img
                                variant="top"
                                src={blog.BlogImg}
                                style={{ height: "220px", objectFit: "cover" }}
                            />

                            <Card.Body className="d-flex flex-column">
                                <span className="badge bg-primary align-self-start mb-2">
                                    {blog.Category}
                                </span>

                                <Card.Title>{blog.BlogTitle}</Card.Title>

                                <Card.Text>
                                    {blog.Content?.substring(0, 120)}...
                                </Card.Text>

                                <p className="text-muted">
                                    Author: {blog.Author?.Name || "Unknown"}
                                </p>

                                <div className="mt-auto d-flex gap-2">
                                    <Link
                                        to={`/blog/${blog._id}`}
                                        className="btn btn-outline-primary"
                                    >
                                        Read More
                                    </Link>
                                    {user && (
                                        <Link
                                            to={`/edit-blog/${blog._id}`}
                                            className="btn btn-warning"
                                        >
                                            Edit
                                        </Link>
                                    )}
                                    {user && (
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(blog._id)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;