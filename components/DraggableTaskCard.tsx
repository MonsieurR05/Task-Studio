"use client";

import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import TaskCard from "@/components/TaskCard";

export default function DraggableTaskCard({ task, onEdit, onDelete }: any) {
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
        status={task.status}
        dueDate={task.dueDate}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </motion.div>
  );
}
