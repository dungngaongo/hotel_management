import express from "express";
import { deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import upload from "../middlewares/upload.js";
import { addRoom } from "../controllers/room.js";
import { checkoutRoom } from "../controllers/room.js";
import { skipAuth } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/availability/:id", updateRoomAvailability);           // here id = room number id

router.put("/:id", updateRoom);
//DELETE
router.delete("/:id", deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

router.post("/add-room", skipAuth, addRoom);

router.post("/checkout", checkoutRoom);

export default router;
