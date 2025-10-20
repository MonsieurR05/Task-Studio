"use client";

import { useEffect, useState } from "react";

export default function StatsOverview() {
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    overdue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/tasks");
      const tasks = await res.json();

      const now = new Date();
      setStats({
        active: tasks.filter((t: any) => t.status === "todo" || t.status === "in-progress").length,
        completed: tasks.filter((t: any) => t.status === "done").length,
        overdue: tasks.filter(
          (t: any) => t.dueDate && new Date(t.dueDate) < now && t.status !== "done"
        ).length,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        { title: "Active Tasks", value: stats.active, color: "text-blue-400" },
        { title: "Completed", value: stats.completed, color: "text-green-400" },
        { title: "Overdue", value: stats.overdue, color: "text-red-400" },
      ].map((item) => (
        <div
          key={item.title}
          className="bg-[#1a1d24] border border-gray-800 rounded-xl p-4"
        >
          <p className="text-sm text-gray-400">{item.title}</p>
          <p className={`text-2xl font-bold mt-1 ${item.color}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
