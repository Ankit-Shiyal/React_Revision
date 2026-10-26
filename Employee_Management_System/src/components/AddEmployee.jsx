import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEmployee,
  getEmpById,
  UpdateEmployee,
} from "../API/EmployeeAxios";
import { Button } from "react-bootstrap";

function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    department: "",
    salary: "",
    phoneNumber: "",
  });

  useEffect(() => {

    const fetchEmployeeDetail = async () => {
      try {
        setLoading(true);
        const emp = await getEmpById(id);

        setFormData({
          name: emp.name,
          id: emp.id,
          email: emp.email,
          department: emp.department,
          salary: emp.salary,
          phoneNumber: emp.phoneNumber,
        });
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchEmployeeDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      console.log("Form Data:", formData);

      if (id) {
        await UpdateEmployee(id, formData);
        alert("Employee updated successfully!");
      } else {
        await addEmployee(formData);
        alert("Employee added successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error("Submit Error:", error); 
    }
  };


  if (loading) {
    <h3>Loading...</h3>;
  }

  return (
    <>

     <div className="container mt-5 ">
       <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label> 
          
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-50"
          />
        </div>
<br />
        <div>
          <label htmlFor="empId">Employee ID:</label>
          <input
            type="number"
            id="empId"
            name="id"
            placeholder="Enter Employee ID"
            value={formData.id}
            onChange={handleChange}
            className="w-50"
          />
        </div>
<br />
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-50"
          />
        </div>
<br />
        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-50"
          >
            <option value="">Select Department</option>
            <option value="fullstack">Full Stack</option>
            <option value="graphic design">Graphic Design</option>
            <option value="ui/ux design">UI/UX Design</option>
            <option value="video editing">Video Editing</option>
          </select>
        </div>
<br />
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            name="salary"
            placeholder="Enter Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-50"
          />
        </div>
<br />
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-50"
          />
        </div>
<br />
        <Button type="submit" variant="outline-primary">
          {submitting ? "update": id ? "Update Employee" : "Add Employee"}
        </Button >
      </form>
     </div>
    </>
  );
}

export default EmployeeForm;