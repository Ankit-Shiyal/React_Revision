import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const validationSchema = Yup.object({
    Name: Yup.string().required("Name is required"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    Address: Yup.string().required("Address is required"),
    Phone: Yup.string().required("Phone is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const formData = new FormData();

      formData.append("Name", values.Name);
      formData.append("Email", values.Email);
      formData.append("Password", values.Password);
      formData.append("Address", values.Address);
      formData.append("Phone", values.Phone);

      if (values.Profile_Pic) {
        formData.append("Profile_Pic", values.Profile_Pic);
      }

      await handleRegister(formData);

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <Formik
          initialValues={{
            Name: "",
            Email: "",
            Password: "",
            Address: "",
            Phone: "",
            Profile_Pic: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, status }) => (
            <Form>
              {status && <div className="alert alert-danger">{status}</div>}

              {["Name", "Email", "Password", "Address", "Phone"].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label">{field}</label>
                  <Field
                    name={field}
                    type={field === "Password" ? "password" : "text"}
                    className="form-control"
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-danger"
                  />
                </div>
              ))}

              <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("Profile_Pic", e.target.files[0])
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;