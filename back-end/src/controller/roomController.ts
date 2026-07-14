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

    // --- REDIS CACHE LAYER START ---

    // Create a unique key for this exact search configuration
    const cacheKey = `rooms:adults:${requestedAdults}:children:${requestedChildren}`;

    try {
      // 1. Try to fetch cached data from Redis
      const cachedRooms = await redisClient.get(cacheKey);

      if (cachedRooms) {
        console.log('⚡ Cache Hit! Serving rooms from Redis.');
        return res.status(200).json({
          success: true,
          data: JSON.parse(cachedRooms), // Convert string back to JSON array
        });
      }
    } catch (redisError) {
      // Log error but don't crash the request (fallback to database if Redis is down)
      console.error('Redis read error:', redisError);
    }

    // --- REDIS CACHE LAYER END ---

    console.log('🐌 Cache Miss! Fetching from PostgreSQL.');

    const availableRooms = await prisma.room.findMany({
      where: {
        is_avaliable: true,
      },
    });

    const matchingRooms = availableRooms.filter((room) => {
      const maxCapacity = Number(room.single_bed) + Number(room.double_bed) * 2;
      return maxCapacity >= totalGuests;
    });

    // --- SAVE TO REDIS START ---
    try {
      // Save the result to Redis
      // EX: 300 tells Redis to delete this cache automatically after 300 seconds (5 minutes)
      await redisClient.set(cacheKey, JSON.stringify(matchingRooms), {
        EX: 300,
      });
    } catch (redisError) {
      console.error('Redis write error:', redisError);
    }
    // --- SAVE TO REDIS END ---

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
