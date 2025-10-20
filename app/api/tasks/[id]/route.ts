import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }) {
  const { id } = params;
  const body = await req.json();

  const updated = await prisma.task.update({
    where: { id },
    data: { status: body.status },
  });

  return Response.json(updated);
}
