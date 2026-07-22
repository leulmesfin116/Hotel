import { prisma } from '../config/db';
import { Request, Response } from 'express';
import { redisClient } from '../config/redisClient';
import Redlock from 'redlock';

const redlock = new Redlock([redisClient], {
  retryCount: 0,
});

export const bookRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { roomId } = req.body;
  const lockkey = `lock:room:${roomId}`;
  const ttl = 8000;
  // handding out a lock
  let lock;
  try {
    lock = await redlock.acquire([lockkey], ttl);
  } catch (err) {
    return res.status(409).json({
      success: false,
      message: 'the room is currently being used by a user,please try again',
    });
  }
  try {
    const room = await prisma.room.findUnique({ where: { id: roomId } });

    if (!room || !room.is_avaliable) {
      return res.status(400).json({ success: false, message: 'Room unavailable.' });
    }
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
