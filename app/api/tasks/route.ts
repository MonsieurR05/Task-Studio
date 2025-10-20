import { prisma } from "@/lib/prisma";

// 📍 GET all tasks
export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(tasks);
}

// 📍 POST create task
export async function POST(req: Request) {
  const { title, dueDate, status } = await req.json();

  if (!title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      dueDate: dueDate ? new Date(dueDate) : null,
      status: status || "todo",
      userId: "demo-user",
    },
  });

  return Response.json(task);
}

// 📍 PUT update task
export async function PUT(req: Request) {
  const { id, title, status, dueDate } = await req.json();

  if (!id) return Response.json({ error: "Missing task ID" }, { status: 400 });

  const updated = await prisma.task.update({
    where: { id },
    data: {
      title,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  return Response.json(updated);
}

// 📍 DELETE task
export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) return Response.json({ error: "Missing ID" }, { status: 400 });

  await prisma.task.delete({ where: { id } });
  return Response.json({ success: true });
}
