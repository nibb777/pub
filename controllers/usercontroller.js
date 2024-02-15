const { StatusCodes } = require("http-status-codes");
const userlist = require("../model/userlist");

const createUserController = async (req, res) => {
    try {
        const user = await userlist.create({ ...req.body });
        res.status(StatusCodes.CREATED).json({ user, message: "User Created Successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed To Create User" });
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const users = await userlist.find();
        res.status(StatusCodes.OK).json({ users, message: "These Are The Users" });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Failed To Find Users" });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const user = await userlist.findOne({ _id: userId });
        if (user) {
            res.status(StatusCodes.OK).json({ message: "The User", user });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const user = await userlist.findOne({ _id: userId });
        if (user) {
            await userlist.findOneAndDelete({ _id: userId });
            res.status(StatusCodes.OK).json({ message: "User Removed Successfully" });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const user = await userlist.findOneAndUpdate({ _id: userId }, req.body, { new: true });
        if (user) {
            res.status(StatusCodes.OK).json({ message: "User Updated Successfully", user });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

module.exports = { createUserController, getAllUsersController, getUserById, updateUser, deleteUser };
