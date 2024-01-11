const express = require("express");
const { authRouter } = require("./auth-routes");
const { userRouter } = require("./user-routes");
const { siteRouter } = require("./site-routes");
const { routeRouter } = require("./route-routes");

const mainRouter = express.Router();
mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/routes", routeRouter);
mainRouter.use("/sites", siteRouter);
module.exports = { mainRouter };
