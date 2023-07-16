const express = require("express");
const router = new express.Router();
const userDB = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// for user registration

router.post("/register", async (req, res) => {
  const { fname, email, password, cpassword } = req.body;
  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({
      error: "fill all the details",
    });
  }

  try {
    const preuser = await userDB.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "This Email is already registered." });
    } else if (password != cpassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm Password Does not match." });
    } else {
      const finalUser = new userDB({
        fname,
        email,
        password,
        cpassword,
      });

      // password hashing
      const storeData = await finalUser.save();
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
});

// for login
router.post("/login", async (req, res) => {
  //console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({
      error: "fill all the details",
    });
  }
  try {
    const userValid = await userDB.findOne({ email: email });

    if (userValid) {
      const isMatch = await bcryptjs.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({
          error: "Invalid details",
        });
      } else {
        //token generate

        const token = await userValid.generateAuthtoken();

        //cookie
        res.cookie("userCookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block");
  }
});
// validuser
router.get("/validUser", authenticate, async (req, res) => {
  try {
    const validUserone = await userDB.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, validUserone });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});
// logout user
router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token != req.token;
    });
    res.clearCookie("userCookie", { path: "/" });

    req.rootUser.save();

    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});
module.exports = router;
