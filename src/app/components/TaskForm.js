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
    <form 
      onSubmit={handleSubmit} 
      style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "10px" }}
    >
      <TextField 
        className="bg-gray-200 rounded-lg p-2" 
        label="Title" 
        value={task.title} 
        onChange={(e) => setTask({ ...task, title: e.target.value })} 
        required 
      />
      
      <TextField 
        className="bg-gray-200 rounded-lg p-2" 
        label="Description" 
        value={task.description} 
        onChange={(e) => setTask({ ...task, description: e.target.value })} 
      />
      
      <TextField 
        className="bg-gray-200 rounded-lg p-2" 
        type="date" 
        value={task.dueDate} 
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })} 
        InputLabelProps={{ shrink: true }} // Fix for date input
      />
      
      <Button variant="contained" color="primary" type="submit">
        Add Task
      </Button>
    </form>
  );
}
