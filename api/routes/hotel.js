// routes/hotel.js
import express from 'express';
import { getHotel } from '../controllers/hotel.js';

const router = express.Router();

router.get("/", getHotel);

export default router;
