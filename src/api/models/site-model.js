const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    routes: [{ type: mongoose.Schema.Types.ObjectId, ref: "route" }],
  },
  {
    timestamps: true,
  }
);

const Site = mongoose.model("site", siteSchema, "site");

module.exports = Site;
