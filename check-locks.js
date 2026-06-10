const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkLocks() {
  const locks = await prisma.$queryRaw`
    SELECT 
      pid, 
      state, 
      query, 
      wait_event_type, 
      wait_event 
    FROM pg_stat_activity 
    WHERE state = 'active' OR state = 'idle in transaction';
  `;
  console.log(locks);
  await prisma.$disconnect();
}

checkLocks().catch(console.error);
