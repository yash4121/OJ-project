const jwt = require("jsonwebtoken");
const userDB = require("../models/userSchema");

const secretKey = "yashsharadyeltiwarisagoodboyvipu";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifytoken = jwt.verify(token, secretKey);

    const rootUser = await userDB.findOne({ _id: verifytoken._id });
    if (!rootUser) {
      throw new Error("user not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(401).json({ status: 401, message: "Unauthorized user" });
  }
};
module.exports = authenticate;
