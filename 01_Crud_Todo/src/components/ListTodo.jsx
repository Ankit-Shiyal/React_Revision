
import React from "react";

const ListTodo = ({ todos, handelDelete, handelEdit }) => {
  return (
    <>
      <table border={2}>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Task</th>
            <th>Description</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((t, index) => (
            <tr key={t.id}>
              <td>{index + 1}</td>
              <td>{t.task}</td>
              <td>{t.description}</td>

              <td>
                <button onClick={() => handelDelete(t.id)}>
                  Delete
                </button>
              </td>

              <td>
                <button onClick={() => handelEdit(t.id)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
