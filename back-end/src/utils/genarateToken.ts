import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
export const generateToken = (userId: string, res: Response) => {
  const payload = { user: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
