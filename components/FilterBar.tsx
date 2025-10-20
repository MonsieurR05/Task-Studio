"use client";
import { useState } from "react";

export default function FilterBar({ onFilterChange }) {
  const [status, setStatus] = useState("all");

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Tasks</h2>
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          onFilterChange(e.target.value);
        }}
        className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-md text-sm p-2 text-[var(--text)]"
      >
        <option value="all">All</option>
        <option value="todo">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
