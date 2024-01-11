const { deleteImgCloudinary } = require("../../middlewares/files-middleware");
const User = require("../models/User-model");

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate("postedRoutes");
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("postedRoutes");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName, email, password, birthYear } = req.body;

    const existingUser = await User.findById(id);
    if (existingUser?.avatar && req.file) {
      deleteImgCloudinary(existingUser.avatar);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...req.body, avatar: req.file ? req.file.path : "no user avatar" },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (user?.avatar) {
      deleteImgCloudinary(user.avatar);
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    for (const user of users) {
      await User.findByIdAndDelete(user._id);
      if (user.avatar) {
        deleteImgCloudinary(user.avatar);
      }
    }
    return res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  editUser,
  deleteUserById,
  deleteAllUsers,
};
