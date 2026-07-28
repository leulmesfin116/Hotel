import { prisma } from '../config/db';
import bcrypt from 'bcryptjs';
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
    token = req.headers.authorization.split('')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    !token;
  }
  res.status(401).json({
    message: 'user is not authorized',
  });
};
