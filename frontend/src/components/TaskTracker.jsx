

import { useState } from "react";

export default function TaskTracker() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("add"); // add | track

  const addTask = () => {
    if (!title.trim()) return;

    if (editId !== null) {
      setTasks(tasks.map(t =>
        t.id === editId ? { ...t, title, desc } : t
      ));
      setEditId(null);
    } else {
      setTasks([...tasks, {
        id: Date.now(),
        title,
        desc,
        completed: false
      }]);
    }

    setTitle("");
    setDesc("");
    setActiveTab("track");
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDesc(task.desc);
    setEditId(task.id);
    setActiveTab("add");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h1>🚀 Task Tracker</h1>

      {/* TOP BUTTONS */}
      <div className="top-buttons">
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          ➕ Add Your Task
        </button>

        <button
          className={activeTab === "track" ? "active" : ""}
          onClick={() => setActiveTab("track")}
        >
          📊 Track Your Task
        </button>
      </div>

      {/* ADD TASK SECTION */}
      {activeTab === "add" && (
        <div className="input-card fade">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Task Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>

          <button onClick={addTask}>
            {editId ? "Update Task" : "Add Task"}
          </button>
        </div>
      )}

      {/* TRACK TASK SECTION */}
      {activeTab === "track" && (
        <div className="task-list fade">
          {tasks.length === 0 && (
            <p className="empty">No tasks added yet</p>
          )}

          {tasks.map(task => (
            <div
              key={task.id}
              className={`task ${task.completed ? "completed" : "pending"}`}
            >
              <div
                className="task-info"
                onClick={() => toggleStatus(task.id)}
              >
                <h3>{task.title}</h3>
                <p>{task.desc}</p>
                <span>
                  {task.completed ? "✔ Marked as Complete" : "⏳ Pending"}
                </span>
              </div>

              <div className="actions">
                <button className="edit" onClick={() => editTask(task)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
