import { prisma } from '../config/db';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/genarateToken';
const register = async (req: Request, res: Response) => {
  const { full_name, email, password, phone_number } = req.body;

  // checking if the user already exits
  const userExists = await prisma.user.findUnique({
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
    data: { full_name, email, password: hashPassword, phone_number } as any, // bypassing typechecking for password since it's missing in schema, or they might add it
  });
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: 'success',
    data: {
      id: user.id,
      email: email,
      full_name: full_name,
      phone_number: phone_number,
      password: hashPassword,
    },
    token,
  });
};
const login = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    return res.status(400).json({
      message: 'invalid email or user',
    });
  }
  // verifying the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({
      message: 'invalid password or email',
    });
  }
  const token = generateToken(user.id, res);
  return res.status(201).json({
    message: 'sucess',
    data: {
      id: user.id,
      email: email,
    },
    token,
  });
};
const logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res
    .status(200)
    .json({ status: 'success', message: 'you log out successfuly' });
};

export { register, login };
