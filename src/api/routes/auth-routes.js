const express = require("express");
const { register, login, logout } = require("../controllers/auth-controllers");
const { isAuth } = require("../../middlewares/auth-middleware");
const { upload } = require("../../middlewares/files-middleware");

const authRouter = express.Router();
authRouter.post("/register", upload.single("avatar"), register);
authRouter.post("/login", login);
authRouter.post("/logout", [isAuth], logout);

module.exports = { authRouter };
