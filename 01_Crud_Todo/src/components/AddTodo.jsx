
import React, { useEffect, useState } from "react";

const AddTodo = ({ handelAdd, editVal }) => {
  const [input, setInput] = useState({
    task: "",
    description: "",
  });

  useEffect(() => {
    if (editVal) {
      setInput({
        task: editVal.task,
        description: editVal.description,
      });
    } else {
      setInput({
        task: "",
        description: "",
      });
    }
  }, [editVal]);

  const handleChange = (field, e) => {
    setInput((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.task.trim() || !input.description.trim()) {
      alert("Enter task and description");
      return;
    }

    handelAdd(input);

    setInput({
      task: "",
      description: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={input.task}
          onChange={(e) => handleChange("task", e)}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Enter description"
          value={input.description}
          onChange={(e) => handleChange("description", e)}
          required
        />

        <br />
        <br />

        <button type="submit">
          {editVal ? "Update" : "Add"}
        </button>
      </form>
    </>
  );
};

export default AddTodo;
