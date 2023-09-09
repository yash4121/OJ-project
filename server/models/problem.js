const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: "true",
  },
  sampleInput: {
    type: String,
    required: "true",
  },
  sampleOutput: {
    type: String,
    required: "true",
  },
  noOfSolves: {
    type: Number,
    default: 0,
  },
  solvers: {
    type: [String],
    default: [],
  },
});

const problemDB = mongoose.model("Problem", problemSchema);
module.exports = problemDB;
