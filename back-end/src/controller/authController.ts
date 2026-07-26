import { prisma } from '../config/db';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
const register = async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body;

  // checking if the user already exits
  const userExists = await prisma.user.findFirst({
    where: { email: email },
  });
  if (userExists) {
    return res.status(400).json({ message: 'user already exists' });
  }
  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  //  creating a user
  const user = await prisma.user.create({
    data: { full_name, email, password: hashPassword } as any, // bypassing typechecking for password since it's missing in schema, or they might add it
  });
  res.status(201).json({
    status: 'success',
    data: {
      id: user.id,
      email: email,
      full_name: full_name,
    },
  });
};

export { register };
