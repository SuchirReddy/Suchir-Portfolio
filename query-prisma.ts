import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const projects = await prisma.project.findMany({ include: { images: true } });
  console.log(projects);
}
main().catch(console.error).finally(() => prisma.$disconnect());
