import { prisma } from '../config/db';
import { Request, Response } from 'express';
const register = async (req: Request, res: Response) => {
  const { full_name, phone_number } = req.body;

  // checking if the user already exits
  const userExists = await prisma.guest.findFirst({
    where: { phone_number: phone_number },
  });
  if (userExists) {
    return res.status(400).json({ message: 'user already exists' });
  }
  // hashing the password
};
export { register };
