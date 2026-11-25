import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { getAllBlogs, updateBlog } from "../api/blogApi";
import { useAuth } from "../context/AuthContext";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    BlogTitle: Yup.string().required("Blog title is required"),
    Content: Yup.string().required("Content is required"),
    Category: Yup.string().required("Category is required"),
    BlogImg: Yup.mixed().nullable(),
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogs = await getAllBlogs();
        const selectedBlog = blogs.find((item) => item._id === id);

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

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const formData = new FormData();

      formData.append("BlogTitle", values.BlogTitle);
      formData.append("Content", values.Content);
      formData.append("Category", values.Category);

      if (values.BlogImg) {
        formData.append("BlogImg", values.BlogImg);
      }

      await updateBlog(id, formData);

      alert("Blog updated successfully!");
      navigate("/");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading Blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger">{error || "Blog not found"}</div>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </Container>
    );
  }

  if (String(blog.Author?._id) !== String(user?._id)) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger">
          You cannot edit this blog.
        </div>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Card className="shadow p-4 mx-auto" style={{ maxWidth: "700px" }}>
        <h2 className="text-center mb-4">Edit Blog</h2>

        <Formik
          enableReinitialize
          initialValues={{
            BlogTitle: blog.BlogTitle || "",
            Content: blog.Content || "",
            Category: blog.Category || "",
            BlogImg: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, status }) => (
            <Form>
              {status && (
                <div className="alert alert-danger">{status}</div>
              )}

              <div className="mb-3">
                <label className="form-label">Blog Title</label>
                <Field
                  name="BlogTitle"
                  className="form-control"
                />
                <ErrorMessage
                  name="BlogTitle"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Blog Content</label>
                <Field
                  as="textarea"
                  name="Content"
                  rows="6"
                  className="form-control"
                />
                <ErrorMessage
                  name="Content"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <Field
                  as="select"
                  name="Category"
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Politics">Politics</option>
                </Field>
                <ErrorMessage
                  name="Category"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Current Blog Image</label>
                <img
                  src={blog.BlogImg}
                  alt={blog.BlogTitle}
                  className="img-fluid rounded d-block mb-3"
                  style={{ maxHeight: "220px" }}
                />

                <label className="form-label">Choose New Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) =>
                    setFieldValue("BlogImg", e.target.files[0] || null)
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Blog"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default EditBlog;