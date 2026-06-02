import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.project.updateMany({
    data: { status: 'PUBLISHED' }
  });
  console.log("Updated all projects to PUBLISHED.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
