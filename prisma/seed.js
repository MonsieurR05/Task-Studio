import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { id: "demo-user" },
    update: {},
    create: {
      id: "demo-user",
      name: "Demo User",
      email: "demo@user.com",
    },
  });
  console.log("✅ Seeded demo user:", demoUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
