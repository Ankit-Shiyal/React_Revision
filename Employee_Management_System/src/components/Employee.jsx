import React, { useEffect, useState } from "react";
import { getAllEmployee, deleteEmployee } from "../API/EmployeeAxios";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllEmployee();

      console.log("Employee Data:", data);

      setEmployee(data);
    } catch (error) {
      console.log("Error:", error);
    } 
  };

  useEffect(() => {
    loadData();
  }, []);


  if (loading) {
    console.log("Loading...");
  } else if (error) {
    return <h1 style={{ color: "red" }}>
      {error.message}
    </h1>;
    
  }

  if (error) {
    return (
      <div>
        <h3>Something went wrong</h3>
        <p>{error}</p>

        <button
          onClick={loadData}
        >
          Try Again
        </button>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      await loadData();
    } catch (error) {
      console.log("Delete Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
    

      <Table border={2} striped bordered hover>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Emp ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Mobile</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>

        <tbody>
          {employee.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.department}</td>
              <td>₹{item.salary}</td>
              <td>{item.phoneNumber}</td>
              <td><Button
                onClick={() => navigate(`/update/${item._id}`)}
                variant="outline-warning"
              >
                Update
              </Button></td>
              <td>
                <Button
                  onClick={() => handleDelete(item._id)}
                  variant="outline-danger"
                >
                  Delete
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Employee;