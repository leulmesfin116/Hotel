import { prisma } from '../config/db';
import { Request, Response } from 'express';
import { redisClient } from '../config/redisClient';

export const findRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { adult, child } = req.query;
  const reqAdults = parseInt(adult as string, 10) || 1;
  const reqChilds = parseInt(child as string, 10) || 1;
  const total = reqAdults + reqChilds;

  const cashekey = `rooms:guest${total}`;

  const casheData = await redisClient.GET(cashekey);
  try {
    if (casheData) {
      res.status(200).json({
        success: true,
        source: 'cashe',
        data: JSON.parse(casheData),
      });
    }
  } catch (redisError) {
    console.error('Redis read error, falling back to database:', redisError);
  }
};
