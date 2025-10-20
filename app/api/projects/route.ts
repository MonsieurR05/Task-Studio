import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { name: "asc" },
  });
  return Response.json(projects);
}
