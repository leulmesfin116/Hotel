import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
});

const connect = async () => {
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
const disconnect = async () => {};
