"use client";

import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoard from "./TaskBoard";
import TaskModal from "./TaskModal";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  status: string;
  dueDate?: string | null;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  // 🧠 Fetch all tasks
  async function loadTasks() {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">🗂 Task Board</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
        >
          <PlusCircle size={18} /> New Task
        </button>
      </div>

      {/* Drag & Drop Board */}
      <DndProvider backend={HTML5Backend}>
        {loading ? (
          <p className="text-gray-400">Loading tasks...</p>
        ) : (
          <TaskBoard
            tasks={tasks}
            onEdit={(task: Task) => setEditing(task)}
            onRefresh={loadTasks}
          />
        )}
      </DndProvider>

      {/* Task Modal */}
      <TaskModal
        open={openModal || !!editing}
        onClose={() => {
          setOpenModal(false);
          setEditing(null);
        }}
        onSaved={loadTasks}
        editing={editing}
      />
    </div>
  );
}
