// routes/booking.js
import express from "express";
import { addBooking, createBooking, deleteBooking, getBookings, updateBooking } from "../controllers/booking.js";
import { getRevenueReport } from "../controllers/booking.js";
import { skipAuth } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", createBooking);

router.put("/:id", updateBooking);

router.delete("/:id", deleteBooking);

router.get("/revenue", getRevenueReport);

router.get("/", getBookings);

router.post("/add-booking", skipAuth, addBooking);

export default router;
