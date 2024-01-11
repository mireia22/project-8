const Site = require("../models/site-model");

const getAllSites = async (req, res, next) => {
  try {
    const allSites = await Site.find().populate("routes");
    return res.status(200).json(allSites);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getSiteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const site = await Site.findById(id);
    return res.status(200).json(site);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const postSite = async (req, res, next) => {
  try {
    const { name, ubication } = req.body;
    const newSite = new Site({ name, ubication, routes: [] });
    const savedSite = await newSite.save();
    return res.status(201).json({ message: "Posted", savedSite });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const editSite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const site = await Site.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(site);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteSiteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const site = await Site.findByIdAndDelete(id);
    return res.status(200).json({ message: "Site deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteAllSites = async (req, res, next) => {
  try {
    const sites = await Site.deleteMany();
    return res.status(200).json({ message: "All sites deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllSites,
  getSiteById,
  postSite,
  editSite,
  deleteSiteById,
  deleteAllSites,
};
