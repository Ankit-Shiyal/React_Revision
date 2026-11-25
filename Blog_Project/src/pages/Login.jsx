import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const validationSchema = Yup.object({
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await handleLogin(values);
      navigate("/");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "450px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <Formik
          initialValues={{ Email: "", Password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              {status && <div className="alert alert-danger">{status}</div>}

              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field name="Email" type="email" className="form-control" />
                <ErrorMessage
                  name="Email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <Field
                  name="Password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="Password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;