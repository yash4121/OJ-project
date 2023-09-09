const express = require("express");
const router = new express.Router();
const userDB = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const generateFile = require("../generatefile");
const executeCpp = require("../executeCpp");
const executePy = require("../executePy");
const cors = require("cors");
const jobDB = require("../models/job");
const generateOutput = require("../generateOutput");
const fs = require("fs");
const { findOne } = require("../models/problem");
const problemDB = require("../models/problem");
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

// compiler
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());

router.get("/status", async (req, res) => {
  const jobId = req.query.id;
  console.log(jobId);
  if (jobId == undefined) {
    return res
      .status(400)
      .json({ status: false, error: "missing id query param" });
  }
  try {
    const job = await jobDB.findById(jobId);
    if (job === undefined) {
      return res.status(404).json({ success: false, error: "invalid job id" });
    }
    return res.status(200).json({ success: true, job });
  } catch (err) {
    res.status(400).json({ success: false, error: JSON.stringify(err) });
  }
});

router.post("/run", async (req, res) => {
  const { language, code, input } = req.body;

  if (code === undefined) {
    res.status(404).json({ success: false, error: "Please provide the code" });
  }
  let job;
  try {
    const filePath = await generateFile(language, code);

    job = await new jobDB({ language, filePath, input }).save();
    const jobId = job._id;
    res.status(201).json({ success: true, jobId });

    let output;
    job["startedAt"] = new Date();
    job["input"] = input;
    if (language === "cpp") {
      output = fs.readFileSync(await executeCpp(filePath, input));
    } else if (language === "py") {
      output = fs.readFileSync(await executePy(filePath, input));
    }
    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;
    await job.save();
    console.log(job);
  } catch (err) {
    job["status"] = "error";
    job["completedAt"] = new Date();
    job["output"] = JSON.stringify(err);
    await job.save();
    // res.status(404).json({ err });
    console.log(job);
  }

  // problem
  const AddProblem = async (req, res, next) => {
    try {
      const { probName, Statement, Constraints, diff } = req.body;
      const existProb = await problemDB.findOne({ probName });
      if (existProb) {
        return res.json({ message: "Problem Name already exists" });
      }
      const prob = problemDB.create({ probName, Statement, Constraints, diff });
      res
        .status(201)
        .json({ message: "Problem added successfully", success: true, prob });
      next();
    } catch (err) {
      res.status(400).json({ success: false, error: JSON.stringify(err) });
    }
  };
  const listofProblems = async (req, res) => {
    try {
      const list = await problemDB.find();
      if (list) {
        return res
          .status(201)
          .json({ message: "list of problems", success: true, list });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const singleProblem = async (req, res) => {};
});
module.exports = router;
