const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["cpp", "java", "py"],
  },
  filePath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now(),
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  output: {
    type: String,
  },
  input: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["success", "error", "pending"],
  },
  code: {
    type: String,
  },
});

const jobDB = new mongoose.model("compilers", jobSchema);
module.exports = jobDB;
