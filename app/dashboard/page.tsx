"use client";

import { useSession } from "next-auth/react";
import { PlusCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AIAssistant from "@/components/AIAssistant";
import TaskBoard from "@/app/dashboard/tasks/TaskBoard";

interface Task {
  id: string;
  title: string;
  status: string;
  dueDate?: string | null;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // 🧩 Fetch all tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // 🧮 Compute stats
  const now = new Date();
  const activeTasks = tasks.filter(
    (t) => t.status === "todo" || t.status === "in-progress"
  ).length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const overdueTasks = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "done"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">
            Welcome back, {session?.user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-[var(--text-dim)] text-sm">
            Here’s a snapshot of your workspace.
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/tasks")}
          className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-md text-sm font-semibold transition"
        >
          <PlusCircle size={18} /> New Task
        </button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search
          className="absolute left-3 top-2.5 text-[var(--text-dim)]"
          size={18}
        />
        <input
          type="text"
          placeholder="Ask AI or search tasks..."
          className="w-full bg-[var(--surface-alt)] border border-[var(--border)] text-sm rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { title: "Active Tasks", value: loading ? "…" : activeTasks },
          { title: "Completed", value: loading ? "…" : completedTasks },
          { title: "Overdue", value: loading ? "…" : overdueTasks },
        ].map((stat) => (
          <div
            key={stat.title}
            className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-4 flex flex-col justify-center hover:border-[var(--accent)] transition"
          >
            <p className="text-sm text-[var(--text-dim)]">{stat.title}</p>
            <p className="text-2xl font-bold text-[var(--accent)] mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* 🗂️ Task Board (Drag + Drop Enabled) */}
      <DndProvider backend={HTML5Backend}>
        <TaskBoard tasks={tasks} />
      </DndProvider>

      {/* 🤖 Floating AI Assistant */}
      <AIAssistant />
    </div>
  );
}
