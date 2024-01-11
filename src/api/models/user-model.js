const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    birthYear: { type: Number, trim: true, required: true },
    role: {
      type: String,
      trim: true,
      default: "user",
      enum: ["admin", "user"],
    },
    adminPassword: {
      type: String,
      trim: true,
      default: process.env.ADMIN_PASSWORD,
    },
    avatar: { type: String, trim: true, required: true },
    postedRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: "route" }],
    visitedSites: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", userSchema, "user");

module.exports = User;
