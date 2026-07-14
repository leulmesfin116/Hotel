import express from 'express';
import { room, findRoom } from '../controller/roomController';

const router = express.Router();
router.get('/availiable-ids', room);
router.get('/search', findRoom);

export default router;
