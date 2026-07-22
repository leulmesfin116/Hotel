import { prisma } from '../config/db';
import { Request, Response } from 'express';
import { redisClient } from '../config/redisClient';
import redlock from 'redlock';

const lock = new redlock([redisClient], {
  retryCount: 0
});

export const bookRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { roomId } = req.body;
  const updatedRoom = await prisma.room.update({
    where: { id: roomId },
    data: { is_avaliable: false },
  });
  try {
    const keys = await redisClient.keys('rooms:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log('cahce cleared and refreshed');
    }
  } catch (redisError) {
    console.log('failed to invalidate the redis', redisError);
  }

  // booking
  return res.status(200).json({
    success: true,
    message: 'room booked successfully',
    data: updatedRoom,
  });
};
