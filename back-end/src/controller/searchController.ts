import { prisma } from '../config/db';
import { Request, Response } from 'express';
import { redisClient } from '../config/redisClient';

const CACHE_TTL_SECONDS = 300; // 5 minutes

export const findRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const reqAdults = parseInt(req.query.adult as string, 10) || 1;
    const reqChilds = parseInt(req.query.child as string, 10) || 0;
    const totalGuests = reqAdults + reqChilds;

    const cacheKey = `rooms:adults:${reqAdults}:children:${reqChilds}`;

    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json({
          success: true,
          source: 'cache',
          data: JSON.parse(cachedData),
        });
      }
    } catch (redisError) {
      console.error('Redis read error, falling back to DB:', redisError);
    }

    console.log(`Cache Miss! Fetching rooms from PostgreSQL...`);
    const availableRooms = await prisma.room.findMany({
      where: { is_avaliable: true },
    });

    const matchingRooms = availableRooms.filter((room) => {
      const maxCapacity = Number(room.single_bed) + Number(room.double_bed) * 2;
      return maxCapacity >= totalGuests;
    });

    try {
      await redisClient.set(cacheKey, JSON.stringify(matchingRooms), {
        EX: CACHE_TTL_SECONDS,
      });
    } catch (redisError) {
      console.error('Redis write error:', redisError);
    }

    return res.status(200).json({
      success: true,
      source: 'database',
      data: matchingRooms,
    });
  } catch (error) {
    console.error('Error finding rooms:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
};
