const express = require("express");
const {
  getAllRoutes,
  getRouteById,
  postRoute,
  editRoute,
  deleteRouteById,
  deleteAllRoutes,
} = require("../controllers/route-controllers");
const { isAuth } = require("../../middlewares/auth-middleware");
const { isAdmin } = require("../../middlewares/admin-middleware");

const routeRouter = express.Router();
routeRouter.get("/", getAllRoutes);
routeRouter.get("/:id", [isAuth], getRouteById);
routeRouter.post("/", [isAuth], postRoute);
routeRouter.put("/:id", [isAuth], editRoute);
routeRouter.delete("/:id", [isAuth], deleteRouteById);
routeRouter.delete("/", [isAuth], [isAdmin], deleteAllRoutes);

module.exports = { routeRouter };
