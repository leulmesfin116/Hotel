import express from 'express';
import { room, findRoom } from '../controller/searchController';

const router = express.Router();
router.get('/availiable-ids', room);
router.get('/search', findRoom);

export default router;
