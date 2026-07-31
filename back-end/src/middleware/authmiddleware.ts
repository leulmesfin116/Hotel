import { prisma } from '../config/db';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401).json({
      message: 'user is not authorized',
    });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await prisma.user.findUnique({
      where: { id: decode.id }
    });

    if (!user) {
      res.status(401).json({ message: "user is not authorized" });
      return;
    }
    
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "user is not authorized" });
  }
};
