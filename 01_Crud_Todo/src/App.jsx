
import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
  const initialTodos = [
    {
      id: 1,
      task: "Running",
      description: "Today I have run 5 km",
      completed: false,
    },
    {
      id: 2,
      task: "Reading",
      description: "Today I am reading a book",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [editVal, setEditVal] = useState(null);

  const handelAdd = (input) => {
    if (!input.task.trim() || !input.description.trim()) {
      alert("Enter task and description");
      return;
    }

    if (editVal) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === editVal.id
            ? {
                ...t,
                task: input.task,
                description: input.description,
              }
            : t
        )
      );

      setEditVal(null);
    } else {
      const newTodo = {
        id: Date.now(),
        task: input.task,
        description: input.description,
        completed: false,
      };

      setTodos((prev) => [...prev, newTodo]);
    }
  };

  const handelDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));

    if (editVal?.id === id) {
      setEditVal(null);
    }
  };

  const handelEdit = (id) => {
    const selectedTodo = todos.find((t) => t.id === id);
    setEditVal(selectedTodo);
  };

  return (
    <>
      <AddTodo
        handelAdd={handelAdd}
        editVal={editVal}
      />

      <ListTodo
        todos={todos}
        handelDelete={handelDelete}
        handelEdit={handelEdit}
      />
    </>
  );
};

export default App;
