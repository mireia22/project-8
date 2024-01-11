const express = require("express");
const {
  getAllUsers,
  getUserById,
  editUser,
  deleteUserById,
  deleteAllUsers,
} = require("../controllers/user-controllers");
const { isAuth } = require("../../middlewares/auth-middleware");
const { isAdmin } = require("../../middlewares/admin-middleware");
const { upload } = require("../../middlewares/files-middleware");

const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", [isAuth], upload.single("avatar"), editUser);
userRouter.delete("/:id", [isAuth], deleteUserById);
userRouter.delete("/", [isAuth], [isAdmin], deleteAllUsers);

module.exports = { userRouter };
