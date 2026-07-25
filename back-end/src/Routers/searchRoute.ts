import express from 'express';
import { findRoom } from '../controller/searchController';

const router = express.Router();
router.get('/search', findRoom);

export default router;
