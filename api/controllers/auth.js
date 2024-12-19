import User from "../models/User.js";
import UsersInfo from "../models/UsersInfo.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, password, first_name, last_name, email, phone, address, role } = req.body;

  try {
    if (!username || !password || !email || !phone) {
      return res.status(400).json({ message: "All required fields must be provided!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      hash,       
      role: role || "user", 
    });

    await UsersInfo.create({
      user_id: newUser.id, 
      first_name,
      last_name,
      email,
      phone,
      address,
    });

    res.status(201).json({
      message: "User has been created successfully!"
    });
  } catch (err) {
    console.error("Error during registration:", err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.hash);

    if (!isPasswordCorrect) return next(createError(403, "Wrong password or username"));

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
    const { password, isAdmin, ...otherDetails } = user.dataValues;

    res.cookie("access_token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};
