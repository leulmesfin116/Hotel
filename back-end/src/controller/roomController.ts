import { prisma } from '../config/db';
import { Request, Response } from 'express';
import { redisClient } from '../config/redisClient';

export const findRoom = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { adults, children } = req.query;

    if (typeof adults !== 'string') {
      return res.status(400).json({
        success: false,
        message:
          'Query parameter "adults" is required and must be a single string',
      });
    }

    const childrenString = typeof children === 'string' ? children : '0';

    const requestedAdults = parseInt(adults, 10);
    const requestedChildren = parseInt(childrenString, 10);

    if (isNaN(requestedAdults) || requestedAdults < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid number of adults (must be at least 1)',
      });
    }

    if (isNaN(requestedChildren) || requestedChildren < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid number of children',
      });
    }

    const totalGuests = requestedAdults + requestedChildren;

    const availableRooms = await prisma.room.findMany({
      where: {
        is_avaliable: true,
      },
    });

    const matchingRooms = availableRooms.filter((room) => {
      const maxCapacity = Number(room.single_bed) + Number(room.double_bed) * 2;

      return maxCapacity >= totalGuests;
    });

    return res.status(200).json({
      success: true,
      data: matchingRooms,
    });
  } catch (error) {
    console.error('Error finding rooms:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
