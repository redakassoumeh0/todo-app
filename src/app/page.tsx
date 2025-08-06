"use client";
import { Task } from "@prisma/client";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((tasks) => setTasks(tasks));
  }, []);

  async function addTask(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const newTask = await res.json();

    setTasks([newTask, ...tasks]);
    setTitle("");
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My TO-DO List</h1>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Add new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2">Add</button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-2 rounded  bg-gray-100 flex items-center"
          >
            {task.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
