import express from "express";
import { deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../middlewares/upload.js";
import { addRoom } from "../controllers/room.js";
import { checkoutRoom } from "../controllers/room.js";
import { skipAuth } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/availability/:id", updateRoomAvailability);           

router.put("/:id", updateRoom);

router.delete("/:id", deleteRoom);

router.get("/:id", getRoom);

router.get("/", getRooms);

router.post("/add-room", skipAuth, addRoom);

router.post("/checkout", checkoutRoom);

export default router;
