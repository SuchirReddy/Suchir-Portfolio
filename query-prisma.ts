import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const images = await prisma.projectImage.findMany();
  for (const img of images) {
    console.log(`Image ID: ${img.id}, Length: ${img.imageUrl.length}, StartsWith: ${img.imageUrl.substring(0, 30)}...`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
