import { useState, useContext, useEffect } from "react";
import { expenseContext } from "../context/ExpenseContext";

const initialForm = {
  Title: "",
  Description: "",
  Amount: "",
  Date: "",
  Category: "",
  Type: "",
};

const Add = () => {
  const { addExpense, editVal } = useContext(expenseContext);
  const [input, setInput] = useState(initialForm);

  useEffect(() => {
    editVal ? setInput(editVal) : null;
  }, [editVal]);

  const handleChange = (field, e) => {
    setInput((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addExpense({
      ...input,
      Amount: Number(input.Amount),
    });

    setInput(initialForm);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Expense Management</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Title"
            value={input.Title}
            onChange={(e) => handleChange("Title", e)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Description"
            value={input.Description}
            onChange={(e) => handleChange("Description", e)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Amount"
            value={input.Amount}
            onChange={(e) => handleChange("Amount", e)}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            value={input.Date}
            onChange={(e) => handleChange("Date", e)}
            required
          />
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            value={input.Category}
            onChange={(e) => handleChange("Category", e)}
          >
            <option value="">Select Category</option>
            <option value="Shopping">Shopping</option>
            <option value="General Expense">General Expense</option>
            <option value="Food">Food</option>
            <option value="HealthCare">HealthCare</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            value={input.Type}
            onChange={(e) => handleChange("Type", e)}
            required
          >
            <option value="">Select Type</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {editVal ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;