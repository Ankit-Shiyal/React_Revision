import React from "react";

const ListTodo = ({
    todos,
    handleDelete,
    handleEdit,
    handleCheck,
}) => {
    return (
        <>
            <table border="1" className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Task</th>
                        <th>Description</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {todos.map((t, index) => {
                        return (
                            <tr key={t.id}>
                                <td>{index + 1}</td>

                                <td>
                                    <input
                                        type="checkbox"
                                        checked={t.completed}
                                        onChange={() => handleCheck(t.id)}
                                    />
                                </td>

                                <td
                                    style={{
                                        textDecoration: t.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {t.task}
                                </td>

                                <td
                                    style={{
                                        textDecoration: t.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {t.description}
                                </td>

                                <td>
                                    <button
                                        className="update"
                                        onClick={() => handleEdit(t.id)}
                                    >
                                        Edit
                                    </button>
                                </td>

                                <td>
                                    <button
                                        className="delete"
                                        onClick={() => handleDelete(t.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ListTodo;