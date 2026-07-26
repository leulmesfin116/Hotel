import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  const payload = { user: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
  return token;
};
