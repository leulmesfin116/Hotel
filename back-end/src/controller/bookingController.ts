import { prisma } from '../config/db';
import { Request, Response } from 'express';
import { redisClient } from '../config/redisClient';

export const bookRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { roomId } = req.body;
  const updateRoom = await prisma.room.update({
    where: { id: roomId },
    data: { is_avaliable: false },
  });
  try{
    const keys =redisClient.keys('rooms:*')
    if(keys.length>0){
     await redisClient.del(keys)
     console.log("")
    }

  }
  catch(){

  }
};
