const User = require("../api/models/User-model");
const { verifyToken } = require("../utils/token");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return next(new Error("Unauthorized"));
  try {
    const decodedToken = verifyToken(token);
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuth };
