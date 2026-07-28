import express from 'express';
import { register, login, logout } from '../controller/authController';
import { authMiddleware } from '../middleware/authmiddleware';

const router = express.Router();
router.use(authMiddleware);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
