// controllers/booking.js
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import UsersInfo from "../models/UsersInfo.js";
import Room from "../models/Room.js";
import sequelize from "../config/database.js";
import { Op } from "sequelize";
import History from "../models/History.js";
import RoomInfo from "../models/RoomInfo.js";

export const addBooking = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    room_number,
    from_time,
    to_time
  } = req.body;

  const t = await sequelize.transaction();

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    let user = await User.findOne({ where: { username: email }, transaction: t });
    if (!user) {
      // Tạo người dùng mới
      user = await User.create({ username: email, hash: "defaultPassword" }, { transaction: t });

      // Lưu thông tin chi tiết người dùng
      await UsersInfo.create(
        {
          user_id: user.id,
          first_name,
          last_name,
          email,
          phone,
        },
        { transaction: t }
      );
    }

    // Kiểm tra xem phòng đã được đặt trong khoảng thời gian này chưa
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
      return res.status(400).json({
        message: "Room is already booked for the selected time range.",
      });
    }

    // Thêm booking mới
    const booking = await Booking.create(
      {
        user_id: user.id,
        room_number,
        from_time,
        to_time,
      },
      { transaction: t }
    );

    // Lấy thông tin phòng và tính doanh thu
    const room = await RoomInfo.findOne({ where: { room_number }, transaction: t });
    const hours = Math.ceil((new Date(to_time) - new Date(from_time)) / (1000 * 60 * 60));
    const income = hours * room.hour_price;

    // Lưu vào bảng lịch sử
    await History.create(
      {
        user_id: user.id,
        user_name: `${first_name} ${last_name}`,
        room_number,
        room_type: room.type,
        from_time,
        to_time,
        income,
      },
      { transaction: t }
    );

    // Cập nhật trạng thái phòng
    await Room.update(
      { status: "bussy" },
      { where: { number: room_number }, transaction: t }
    );

    await t.commit();

    res.status(200).json({
      message: "Booking added successfully",
      booking,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error adding booking:", error);
    res.status(500).json({ message: "Failed to add booking", error });
  }
};

export const updateBooking = async (req, res) => {
  const { id } = req.params; 
  const { from_time, to_time, check_in } = req.body; 

  try {
    const booking = await Booking.findOne({ where: { id } });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Kiểm tra xem thời gian mới có gây xung đột không
    const conflictingBooking = await Booking.findOne({
      where: {
        room_number: booking.room_number,
        id: { [Op.ne]: id },
        [Op.or]: [
          { from_time: { [Op.between]: [from_time, to_time] } },
          { to_time: { [Op.between]: [from_time, to_time] } },
          {
            from_time: { [Op.lte]: from_time },
            to_time: { [Op.gte]: to_time },
          },
        ],
      },
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: "Room is already booked for the selected time range." });
    }

    await booking.update({ from_time, to_time, check_in });

    const room = await Room.findOne({ where: { number: booking.room_number } });
    const hours = Math.ceil((new Date(to_time) - new Date(from_time)) / (1000 * 60 * 60));
    const income = hours * room.hour_price;

    await History.update(
      {
        from_time,
        to_time,
        income,
      },
      { where: { user_id: booking.user_id, room_number: booking.room_number } }
    );

    res.status(200).json({ message: "Booking updated successfully." });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Failed to update booking.", error });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  const t = await sequelize.transaction(); 

  try {
    const booking = await Booking.findOne({ where: { id }, transaction: t });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    const { room_number, user_id } = booking;

    await booking.destroy({ transaction: t });

    // Kiểm tra xem còn booking nào cho phòng này không
    const remainingBookings = await Booking.findOne({
      where: { room_number },
      transaction: t,
    });

    // Nếu không còn booking, cập nhật trạng thái phòng thành "idle"
    if (!remainingBookings) {
      await Room.update(
        { status: "idle" },
        { where: { number: room_number }, transaction: t }
      );
    }

    await t.commit(); 

    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    await t.rollback();
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Failed to delete booking.", error });
  }
};


export const getBookings = async (req, res, next) => {
  try {
    const books = await Booking.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    next(error);
  }
};

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
