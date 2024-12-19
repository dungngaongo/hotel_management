import User from "../models/User.js";
import UsersInfo from "../models/UsersInfo.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};
  

export const deleteUser = async (req, res, next) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
};
  

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
  

export const getUsers = async (req, res, next) => {
    try {
        const users = await UsersInfo.findAll({
            include: [
                {
                    model: User, 
                    attributes: ["id"], 
                },
            ],
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        next(error);
    }
};