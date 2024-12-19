// controllers/booking.js
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import UsersInfo from "../models/UsersInfo.js";
import Room from "../models/Room.js";
import sequelize from "../config/database.js";
import { Op } from "sequelize";
import History from "../models/History.js";
import RoomInfo from "../models/RoomInfo.js";

export const createBooking = async (req, res) => {
  const { first_name, last_name, email, phone, room_number, from_time, to_time } = req.body;

  const t = await sequelize.transaction(); 

  try {
    let user = await User.findOne({ where: { username: email }, transaction: t });
    if (!user) {
      user = await User.create({ username: email, hash: "defaultPassword" }, { transaction: t }); // Thay "defaultPassword" bằng logic hash mật khẩu thực tế

      await UsersInfo.create({
        user_id: user.id,
        first_name,
        last_name,
        email,
        phone,
      },
      { transaction: t });
    } else {
      const userInfo = await UsersInfo.findOne({ where: { user_id: user.id } });
      if (!userInfo) {
        await UsersInfo.create({
          user_id: user.id,
          first_name,
          last_name,
          email,
          phone,
        }, 
        { transaction: t });
      }
    }

    const conflictingBooking = await Booking.findOne({
      where: {
        room_number,
        [Op.or]: [
          { from_time: { [Op.between]: [from_time, to_time] } },
          { to_time: { [Op.between]: [from_time, to_time] } },
          {
            from_time: { [Op.lte]: from_time },
            to_time: { [Op.gte]: to_time },
          },
        ],
      },
      transaction: t,
    });

    if (conflictingBooking) {
      await t.rollback();
      return res.status(400).json({ message: "Room is already booked for the selected time range." });
    }

    const booking = await Booking.create({ 
      user_id: user.id, 
      room_number, 
      from_time, 
      to_time
    },
    { transaction: t });

    const room = await RoomInfo.findOne({ where: { room_number }, transaction: t });
    const hours = Math.ceil((new Date(to_time) - new Date(from_time)) / (1000 * 60 * 60));
    const income = hours * room.hour_price;

    await History.create({
      user_id: user.id,
      user_name: `${first_name} ${last_name}`,
      room_number,
      room_type: room.type,
      from_time,
      to_time,
      income,
    },
    { transaction: t });

    await Room.update(
      { status: "bussy" },
      { where: { number: room_number }, transaction: t }
    );

    await t.commit();

    res.status(200).json({ message: "Booking created successfully", booking });
  } catch (error) {
    await t.rollback();
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking", error });
  }
};

export const getRevenueReport = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const revenues = await History.findAll({
      where: {
        from_time: {
          [Op.gte]: new Date(start_date),
        },
        to_time: {
          [Op.lte]: new Date(end_date),
        },
      },
      attributes: ["room_number", "room_type", "income", "from_time", "to_time"],
    });

    const totalRevenue = revenues.reduce((acc, record) => acc + record.income, 0);

    res.status(200).json({ message: "Revenue report generated successfully", totalRevenue, records: revenues });
  } catch (error) {
    console.error("Error generating revenue report:", error);
    res.status(500).json({ message: "Failed to generate revenue report", error });
  }
};
