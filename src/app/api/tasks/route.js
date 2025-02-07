import { connectDB } from "@/app/utils/db";
import Task from "@/models/Task";

export async function GET() {
  await connectDB();
  const tasks = await Task.find();
  return Response.json(tasks);
}

export async function POST(req) {
  await connectDB();
  const { title, description, dueDate } = await req.json();
  const newTask = await Task.create({ title, description, dueDate });
  return Response.json(newTask);
}

export async function PATCH(req) {
  await connectDB();
  const { id, completed } = await req.json();
  const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
  return Response.json(updatedTask);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Task.findByIdAndDelete(id);
  return Response.json({ message: "Task deleted" });
}