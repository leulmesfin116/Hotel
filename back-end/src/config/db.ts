import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma';
import dotenv from 'dotenv';

// Load env vars if this file is imported before server.ts calls dotenv.config()
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('DB connected via prisma');
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Db disconnected ${error.message}`);
    } else {
      console.error(`Db disconnected ${String(error)}`);
    }
  }
};
const disconnectDB = async () => {
  await prisma.$disconnect();
};
export { prisma, connectDB, disconnectDB };
