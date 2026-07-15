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
  console.log(`Cache Miss! Querying PostgreSQL database...`);
  const avaliableRoom = await prisma.room.findMany({
    where: { is_avaliable: true },
  });
  const matchingRooms = avaliableRoom.filter((room) => {
    const maxCapacity = Number(room.single_bed) + Number(room.double_bed) * 2;
    return maxCapacity >= total;
  });
  try {
    await redisClient.set(cashekey, JSON.stringify(matchingRooms));
    res.status(200).json({
      success: true,
      source: 'database',
      data: matchingRooms,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
};
