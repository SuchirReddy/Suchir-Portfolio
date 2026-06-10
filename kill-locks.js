const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function killLocks() {
  try {
    const result = await prisma.$executeRawUnsafe(`
      SELECT pg_terminate_backend(pid) 
      FROM pg_stat_activity 
      WHERE state = 'idle in transaction' 
      AND pid <> pg_backend_pid() 
      AND datname = current_database();
    `);
    console.log("Terminated idle transactions:", result);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

killLocks();
