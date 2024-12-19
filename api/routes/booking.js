// routes/booking.js
import express from "express";
import { createBooking } from "../controllers/booking.js";
import { getRevenueReport } from "../controllers/booking.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/revenue", getRevenueReport);

export default router;
