"use client";
import React from "react";
import TaskCard from "./TaskCard";

export default function KanbanBoard({ tasks }: { tasks: any[] }) {
  const columns = ["todo", "in progress", "done"];

  return (
    <div className="grid grid-cols-3 gap-6">
      {columns.map((col) => (
        <div key={col} className="bg-[#14161c] border border-gray-800 rounded-xl p-4">
          <h2 className="capitalize font-semibold mb-4 text-gray-300">
            {col.replace("-", " ")}
          </h2>
          <div className="space-y-3 min-h-[200px]">
            {tasks
              .filter((t) => t.status === col)
              .map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
