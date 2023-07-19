const { rejects } = require("assert");
const { exec } = require("child_process");
const { error } = require("console");
const path = require("path");
const { stdout, stderr } = require("process");
const { v4: uuid } = require("uuid");
const generateInput = require("./generateInput");
const generateOutput = require("./generateOutput");

const executePy = (filePath, input) => {
  const inputFile = generateInput(input);
  const outputFile = generateOutput();
  return new Promise((resolve, reject) => {
    exec(
      `python ${filePath} < ${inputFile} > ${outputFile}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(outputFile);
      }
    );
  });
};
module.exports = executePy;
