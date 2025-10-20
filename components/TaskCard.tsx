"use client";

import { Calendar, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface TaskCardProps {
  title: string;
  status?: string;
  dueDate?: string | null;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskCard({
  title,
  status = "todo",
  dueDate,
  onClick,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const displayStatus = status || "todo";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative group cursor-pointer select-none bg-[#1a1d24] hover:bg-[#232833] border border-gray-800 hover:border-indigo-600/60 rounded-xl p-4 transition-all duration-200 shadow-sm"
    >
      {/* Title */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-100 leading-tight">{title}</h3>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="text-gray-600 opacity-0 group-hover:opacity-100 hover:text-gray-300 transition"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-6 bg-[#1e2129] border border-gray-800 rounded-md shadow-lg z-20 w-32"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.();
                }}
                className="flex items-center gap-2 px-3 py-2 w-full text-sm text-gray-300 hover:bg-gray-800 transition"
              >
                <Edit2 size={14} /> Edit
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete?.();
                }}
                className="flex items-center gap-2 px-3 py-2 w-full text-sm text-red-400 hover:bg-red-900/30 transition"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Due date */}
      {dueDate && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={12} />
          <span>{new Date(dueDate).toLocaleDateString()}</span>
        </div>
      )}

      {/* Status */}
      <span
        className={`inline-block mt-3 text-xs font-medium px-2 py-1 rounded-md ${
          displayStatus === "done"
            ? "bg-green-500/10 text-green-400 border border-green-700/40"
            : displayStatus === "in-progress"
            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-700/40"
            : "bg-gray-500/10 text-gray-400 border border-gray-700/40"
        }`}
      >
        {displayStatus.replace("-", " ").toUpperCase()}
      </span>
    </motion.div>
  );
}
