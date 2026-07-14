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
    
    if (isNaN(requestedAdults)) {
      return res.status(400).json({ success: false, message: 'Invalid number of adults' });
    }

    const availableRooms = await prisma.room.findMany({
      where: { is_avaliable: true },
    });

    const matchingRooms = availableRooms.filter((room) => {
      const singleBeds = Number(room.single_bed);
      const doubleBeds = Number(room.double_bed);
      const capacity = singleBeds + (doubleBeds * 2);
      return capacity >= requestedAdults;
    });

    res.status(200).json({
      success: true,
      data: matchingRooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export { room, findRoom };
