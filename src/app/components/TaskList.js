"use client";
import { useEffect, useState } from "react";
import { Checkbox, Button, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const toggleTaskCompletion = async (id, completed) => {
    await fetch(`/api/tasks/${id}`, {  // Updated endpoint
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {  // Updated endpoint
      method: "DELETE",
    });
    fetchTasks();
  };

  return (
    <List>
      {tasks.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No tasks available. Add some!
        </Typography>
      ) : (
        tasks.map((task) => (
          <ListItem key={task._id} divider>
            <Checkbox checked={task.completed} onChange={() => toggleTaskCompletion(task._id, !task.completed)} />
            <ListItemText primary={task.title} secondary={task.description} />
            <Button variant="contained" color="secondary" onClick={() => deleteTask(task._id)}>Delete</Button>
          </ListItem>
        ))
      )}
    </List>
  );
}
