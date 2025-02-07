"use client";

import { useState, useEffect } from "react";
import { Button, List, ListItem, ListItemText, IconButton, MenuItem, Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Lottie from "lottie-react";
import emptyAnimation from "../../../public/empty.json";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Filter: "all", "completed", "pending"
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const handleAddTask = async (task) => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    fetchTasks();
    setShowForm(false);
  };

  const handleToggleComplete = async (id, completed) => {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !completed }),
    });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
  );

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center p-5">
      <nav className="w-full bg-opacity-50 bg-gray-900 py-4 px-8 flex justify-between items-center rounded-md">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <div className="flex items-center gap-4">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-white"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
          >
            <MenuItem value="all">All Tasks</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(!showForm)}
            className="text-white"
          >
            {showForm ? "Close Form" : "Add Task"}
          </Button>
        </div>
      </nav>

      {showForm && <TaskForm onTaskAdded={handleAddTask} />}

      <div className="mt-5 w-full max-w-3xl">
        {filteredTasks.length > 0 ? (
          <List className="flex flex-wrap gap-4 justify-start">
            {filteredTasks.map((task) => (
              <ListItem
                key={task._id}
                className={`bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between items-start ${
                  task.completed ? "opacity-70" : ""
                }`}
                style={{
                  minWidth: "250px",
                  maxWidth: "400px",
                  wordBreak: "break-word",
                }}
              >
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                  className="text-white mb-3"
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant="outlined"
                    color={task.completed ? "success" : "warning"}
                    onClick={() => handleToggleComplete(task._id, task.completed)}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </Button>
                  <IconButton onClick={() => handleDelete(task._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
        ) : (
          <Lottie animationData={emptyAnimation} loop autoPlay style={{ width: 300, margin: "auto" }} />
        )}
      </div>
    </div>
  );
}

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Title is required!");

    const task = { title, description, dueDate };
    await onTaskAdded(task);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-50 p-4 rounded-md shadow-md w-full max-w-3xl mt-4">
      <div className="mb-3">
        <label className="block text-white mb-1">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-md bg-transparent border border-gray-600 text-white"
        />
      </div>
      <div className="mb-3">
        <label className="block text-white mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded-md bg-transparent border border-gray-600 text-white"
        />
      </div>
      <div className="mb-3">
        <label className="block text-white mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 rounded-md bg-transparent border border-gray-600 text-white"
        />
      </div>
      <Button type="submit" variant="contained" color="primary" className="w-full">
        Add Task
      </Button>
    </form>
  );
}
