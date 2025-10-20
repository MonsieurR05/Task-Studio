import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.task.findMany();
  return Response.json(tasks);
}
