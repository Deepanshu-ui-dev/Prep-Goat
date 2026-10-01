import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { createPgPool } from './src/db';

const pool = createPgPool();
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.problem.deleteMany({});
  console.log('Deleted all problems');
  const count = await prisma.problem.count();
  console.log('Problem count:', count);
}

main().finally(() => prisma.$disconnect());
