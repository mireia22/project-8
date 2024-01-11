const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    longitude: { type: Number },
    height: { type: Number },
    difficulty: { type: String },
    site: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "user" },
    routeImg: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Route = mongoose.model("route", routeSchema, "route");

module.exports = Route;
