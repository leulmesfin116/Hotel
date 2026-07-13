import express from 'express';
import {room} from "../controller/roomController"


const router = express.Router();
router.get('/room', room);

export default router;
