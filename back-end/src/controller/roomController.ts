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
      data: roomIds,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const findRoom = async (req: Request, res: Response) => {
  try {
    const requestedAdults = parseInt(req.query.adults as string);
  } catch (error) {}
};

export { room };
