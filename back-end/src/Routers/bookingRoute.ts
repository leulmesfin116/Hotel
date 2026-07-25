import express from 'express';
import { bookRoom, checkOut } from '../controller/bookingController';

const router = express.Router();

router.get('/booking', bookRoom);
router.post('/check-out', checkOut);

app.use;
