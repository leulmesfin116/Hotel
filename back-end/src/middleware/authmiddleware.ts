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
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    return res.status(401).json({
      message: 'User is not authorized, no token',
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decode.id }
    });
    
    if(!user){
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    
    // Add user to request (requires extending Request type, typically done in a custom d.ts file)
    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
