import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { addBlog } from "../api/blogApi";

const AddBlog = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    BlogTitle: Yup.string().required("Blog title is required"),
    Content: Yup.string().required("Content is required"),
    Category: Yup.string().required("Category is required"),
    BlogImg: Yup.mixed().required("Blog image is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const formData = new FormData();

      formData.append("BlogTitle", values.BlogTitle);
      formData.append("Content", values.Content);
      formData.append("Category", values.Category);
      formData.append("BlogImg", values.BlogImg);

      await addBlog(formData);

      alert("Blog added successfully!");

      navigate("/");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Card className="shadow p-4 mx-auto" style={{ maxWidth: "700px" }}>
        <h2 className="text-center mb-4">Create New Blog</h2>

        <Formik
          initialValues={{
            BlogTitle: "",
            Content: "",
            Category: "",
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
                  type="text"
                  name="BlogTitle"
                  className="form-control"
                  placeholder="Enter blog title"
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
                  placeholder="Write your blog content..."
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

              <div className="mb-4">
                <label className="form-label">Blog Image</label>

                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) =>
                    setFieldValue("BlogImg", e.target.files[0])
                  }
                />

                <ErrorMessage
                  name="BlogImg"
                  component="div"
                  className="text-danger"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Publish Blog"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default AddBlog;