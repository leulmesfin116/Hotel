import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { prisma, connectDB, disconnectDB } from './config/db';

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// handle unhandke promise rejection
process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// handle uncaught exception
process.on("uncaughtException", async (err) => {
  console.error("uncaughtException", err);
  await disconnectDB();
  process.exit(1);
});

// graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM recieved,shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});