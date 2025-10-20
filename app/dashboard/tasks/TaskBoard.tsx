"use client";

import { useState, useEffect, useCallback } from "react";
import { useDrop } from "react-dnd";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import TaskCard from "@/components/TaskCard";
import { useDrag } from "react-dnd";

// Task interface
interface Task {
  id: string;
  title: string;
  status?: string;
  dueDate?: string | null;
}

// ===== MAIN BOARD =====
export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const moveTask = async (id: string, newStatus: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );

    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status: newStatus }),
    });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
    toast.success("Task deleted");
    loadTasks();
  };

  const statuses = ["todo", "in-progress", "done"];

  return (
    <div className="grid grid-cols-3 gap-6">
      {statuses.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((t) => (t.status || "todo") === status)}
          onDropTask={moveTask}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

// ===== COLUMN =====
function Column({
  status,
  tasks,
  onDropTask,
  onDelete,
}: {
  status: string;
  tasks: Task[];
  onDropTask: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}) {
  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: any) => onDropTask(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <motion.div
      ref={dropRef}
      layout
      className={`rounded-xl p-4 border border-gray-800 bg-[#14161c] transition-all duration-200 ${
        isOver ? "ring-2 ring-indigo-500/60 shadow-lg shadow-indigo-500/10" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-gray-100 capitalize tracking-wide">
          {(status || "unknown").replace("-", " ")}
        </h2>
        <button
          className="text-gray-400 hover:text-indigo-400 transition"
          onClick={() => toast(`Add task to ${status}`)}
        >
          <Plus size={16} />
        </button>
      </div>

      <motion.div layout className="space-y-3 min-h-[200px]">
        <AnimatePresence>
          {tasks.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="text-xs text-gray-600 italic text-center py-6"
            >
              No tasks
            </motion.p>
          ) : (
            tasks.map((t) => (
              <motion.div key={t.id} layout>
                <DraggableTaskCard
                  task={t}
                  onDelete={() => onDelete(t.id)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ===== DRAGGABLE CARD =====
function DraggableTaskCard({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: () => void;
}) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <motion.div
      ref={dragRef}
      initial={{ scale: 1 }}
      animate={{ scale: isDragging ? 0.95 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`${isDragging ? "opacity-50" : "opacity-100"} transition`}
    >
      <TaskCard
        title={task.title}
        status={task.status || "todo"}
        dueDate={task.dueDate}
        onDelete={onDelete}
      />
    </motion.div>
  );
}
