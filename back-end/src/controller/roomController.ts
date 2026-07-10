import { prisma } from '../config/db';
import { Request, Response } from 'express';

const room = async (req: Request, res: Response) => {
  try {
    const availableRooms = await prisma.room.findMany({
      where: { is_avaliable: true },
      select: { id: true },
    });

    const roomIds = availableRooms.map((room) => room.id);

    res.status(200).json({
      success: true,
     
