import Room from "../models/Room.js";
import RoomInfo from "../models/RoomInfo.js";
import sequelize from "../config/database.js";

export const updateRoom = async (req, res, next) => {
  try {
    const { status, ...roomInfoData } = req.body; 

    await sequelize.transaction(async (t) => {
      if (status) {
        await Room.update(
          { status }, 
          { where: { number: req.params.id }, transaction: t }
        );
      }

      await RoomInfo.update(
        { ...roomInfoData },
        { where: { room_number: req.params.id }, transaction: t }
      );
    });

    res.status(200).json({ message: "Room and RoomInfo updated successfully." });
  } catch (err) {
    console.error("Error updating room and room info:", err);
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.unavailableDates.push(...req.body.dates);  
    await room.save();  

    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findOne({ where: { number: id } });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await Room.destroy({ where: { number: id } });
    await RoomInfo.destroy({ where: { room_number: id } }); 

    res.status(200).json({ message: "Room has been deleted successfully." });
  } catch (err) {
    console.error("Error deleting room:", err);
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await RoomInfo.findAll({
      include: [
        {
          model: Room,
          attributes: ["status","number"],
        },
      ],
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    next(error);
  }
};

export const addRoom = async (req, res, next) => {
  const { image, room_number, ...roomDetails } = req.body;

  try {
    const newRoom = await Room.create({ number: room_number, status: "idle" });
    await RoomInfo.create({ room_number: newRoom.number, ...roomDetails, image });

    res.status(200).json("Rooms have been added successfully.");
  } catch (error) {
    console.error("Error adding room:", error);
    next(error);
  }
};

export const checkoutRoom = async (req, res) => {
  const { room_number } = req.body;

  try {
    const room = await Room.findOne({ where: { number: room_number } });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await Room.update(
      { status: "idle" },
      { where: { number: room_number } }
    );

    res.status(200).json({ message: "Room status updated to idle." });
  } catch (error) {
    console.error("Error updating room status:", error);
    res.status(500).json({ message: "Failed to update room status", error });
  }
};
