"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    setTask({ title: "", description: "", dueDate: "" });
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TextField className="bg-gray-500" label="Title" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} required />
      <TextField className="bg-gray-500" label="Description" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
      <TextField className="bg-gray-500" type="date" value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
      <Button variant="contained" color="primary" type="submit">Add Task</Button>
    </form>
  );
}
