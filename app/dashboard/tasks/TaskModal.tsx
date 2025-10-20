"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function TaskModal({ open, onClose, onSaved, editing }: any) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDueDate(editing.dueDate ? editing.dueDate.split("T")[0] : "");
      setStatus(editing.status);
    }
  }, [editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const body = editing ? { id: editing.id, title, dueDate, status } : { title, dueDate, status };

    const res = await fetch("/api/tasks", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(editing ? "Task updated!" : "Task created!");
      onSaved();
      onClose();
    } else {
      toast.error("Something went wrong.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#14161c] border border-gray-700 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Edit Task" : "New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-[#1a1d24] border border-gray-700 rounded"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 bg-[#1a1d24] border border-gray-700 rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 bg-[#1a1d24] border border-gray-700 rounded"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            >
              {editing ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
