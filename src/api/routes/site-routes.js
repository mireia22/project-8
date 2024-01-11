const express = require("express");
const {
  getAllSites,
  getSiteById,
  postSite,
  editSite,
  deleteAllSites,
  deleteSiteById,
} = require("../controllers/site-controllers");
const { isAuth } = require("../../middlewares/auth-middleware");
const { isAdmin } = require("../../middlewares/admin-middleware");
const { upload } = require("../../middlewares/files-middleware");

const siteRouter = express.Router();
siteRouter.get("/", getAllSites);
siteRouter.get("/:id", getSiteById);
siteRouter.post("/", [isAuth], upload.single("siteImg"), postSite);
siteRouter.put("/:id", [isAuth], upload.single("siteImg"), editSite);
siteRouter.delete("/:id", [isAuth], deleteSiteById);
siteRouter.delete("/", [isAuth], [isAdmin], deleteAllSites);

module.exports = { siteRouter };
