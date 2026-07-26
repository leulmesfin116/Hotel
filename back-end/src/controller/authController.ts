import { prisma } from '../config/db';
import { Request, Response } from 'express';
const register = async (req: Request, res: Response) => {
  const { full_name, phone_number, email } = req.body;

  // checking if the user already exits
  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });
  if (userExists) {
    return res.status(400).json({ message: 'user already exists' });
  }
};

export { register };
