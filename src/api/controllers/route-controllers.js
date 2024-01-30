const { deleteImgCloudinary } = require("../../middlewares/files-middleware");
const Route = require("../models/route-model");
const Site = require("../models/site-model");
const User = require("../models/User-model");

const getAllRoutes = async (req, res, next) => {
  try {
    const allRoutes = await Route.find().populate("createdBy");
    return res.status(200).json(allRoutes);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getRouteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id).populate("createdBy");
    return res.status(200).json(route);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const postRoute = async (req, res, next) => {
  const { name, site, longitude, difficulty } = req.body;

  try {
    if (!name || !site) {
      return next(new Error("Name and Site ARE MANDATORY."));
    }
    const existingSite = await Site.findOne({ name: site });
    let siteId;
    if (existingSite) {
      siteId = existingSite._id;
    } else {
      const newSite = new Site({ name: site });
      const savedSite = await newSite.save();
      siteId = savedSite._id;
    }
    const newRoute = new Route({
      name,
      site,
      longitude,
      difficulty,
      createdBy: req.user.id,
      routeImg: req.file ? req.file.path : "no route image",
    });

    const savedRoute = await newRoute.save();

    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { postedRoutes: savedRoute, visitedSites: savedRoute.site } },
      { new: true }
    );

    await Site.findByIdAndUpdate(
      siteId,
      { $push: { routes: savedRoute._id } },
      { new: true }
    );

    return res.status(201).json({ message: "Posted", savedRoute });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const editRoute = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, site, longitude, height, difficulty } = req.body;

    const existingRoute = await Route.findById(id);

    if (existingRoute?.routeImg && req.file) {
      deleteImgCloudinary(existingRoute.routeImg);
    }

    const updatedRoute = await Route.findByIdAndUpdate(
      id,
      {
        name,
        site,
        longitude,
        height,
        difficulty,
        routeImg: req.file ? req.file.path : "No route image",
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedRoute);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteRouteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const route = await Route.findByIdAndDelete(id);
    if (route?.routeImg) {
      deleteImgCloudinary(route.routeImg);
    }
    return res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteAllRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find();
    for (const route of routes) {
      await Route.findByIdAndDelete(route._id);
      if (route.routeImg) {
        deleteImgCloudinary(route.routeImg);
      }
    }
    return res.status(200).json({ message: "All routes deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllRoutes,
  getRouteById,
  postRoute,
  editRoute,
  deleteRouteById,
  deleteAllRoutes,
};
