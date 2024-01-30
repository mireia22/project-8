const { generateToken } = require("../../utils/token");
const User = require("../models/User-model");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { userName, email, password, birthYear, adminPassword } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return next(new Error("Email already exists"));
    let userRole = "user";

    if (adminPassword) {
      const isAdmin = adminPassword === process.env.ADMIN_PASSWORD;

      if (isAdmin) {
        userRole = "admin";
      } else {
        return next(new Error("Invalid admin password"));
      }
    }

    const newUser = new User({
      userName,
      email,
      password,
      birthYear,
      role: userRole,
      avatar: req.file ? req.file.path : "no user avatar",
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: `New user ${savedUser.email} registered.` });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, adminPassword } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) return next(new Error("User not found"));

    if (adminPassword) {
      const correctAdminPassword = adminPassword === process.env.ADMIN_PASSWORD;
      if (!correctAdminPassword) {
        return next(new Error("Invalid admin password"));
      }
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(new Error("Wrong credentials"));
    }

    const token = generateToken(validUser._id, validUser.email);

    return res.status(200).json({ token: token, loggedUser: validUser.email });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
