import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextprovider";

function Todos() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setTodos(data))
        .catch((err) => console.error("Failed to fetch todos", err));
    }
  }, [user]);
  console.log("Todos Data", todos);

  const handleAddTodo = () => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        title: newTodoTitle,
        completed: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((prev) => [data, ...prev]);
        setNewTodoTitle("");
      })
      .catch((err) => console.error("Failed to add todo", err));
  };

  const handleUpdate = (id, newTitle) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update todo");
        return res.json();
      })
      .then((data) => {
        setTodos((prev) => prev.map((p) => (p.id === id ? data : p)));
        setEditId(null);
        setEditTitle("");
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete todo");
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>{user.username}'s Todos</h1>
      <input
        type="text"
        placeholder="New todo"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {editId === t.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(t.id, editTitle)}>
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditId(null);
                    setEditTitle("");
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p>{t.title}</p>
                <p>Completed: {t.completed ? "Yes" : "No"}</p>
                <button
                  onClick={() => {
                    setEditId(t.id);
                    setEditTitle(t.title);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
