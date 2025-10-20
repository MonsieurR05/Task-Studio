import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // 🧠 Get current date for context
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // 🧠 Call Cloudflare Workers AI (Llama 3.1 8B Instruct)
  const cfRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are a helpful AI assistant that manages tasks.

Today's date is ${currentDate.toDateString()} (${currentYear}).

When the user gives an instruction, interpret vague dates like "this year", "next week", or "tomorrow"
based on today's date.

Always respond ONLY with strict JSON in this format:
{"action":"create_task","task":"<task title>","due_date":"<YYYY-MM-DD>","response":"<friendly reply>"}`,
          },
          { role: "user", content: prompt },
        ],
      }),
    }
  );

  const data = await cfRes.json();
  console.log("Cloudflare AI raw response:", data);

  if (!data?.result?.response) {
    return Response.json({ error: "Cloudflare AI returned no result", raw: data });
  }

  let ai;
  try {
    ai = JSON.parse(data.result.response);
  } catch {
    return Response.json({ error: "Invalid JSON from AI", raw: data.result.response });
  }

  // 🧩 Auto-fix past dates (e.g. if AI picks 2024 when it's 2025)
  if (ai.due_date) {
    const due = new Date(ai.due_date);
    const now = new Date();

    if (due < now) {
      due.setFullYear(now.getFullYear() + 1);
    }

    ai.due_date = due.toISOString().split("T")[0];
  }

  // ✅ Save AI-created task if valid
  if (ai.action === "create_task" && ai.task) {
    await prisma.task.create({
      data: {
        title: ai.task,
        dueDate: ai.due_date ? new Date(ai.due_date) : null,
        userId: "demo-user",
      },
    });
  }

  return Response.json(ai);
}

export async function GET() {
  return Response.json({
    message: "✅ AI route is live — send a POST with { prompt } to interact.",
  });
}
