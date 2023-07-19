const { rejects } = require("assert");
const { exec } = require("child_process");
const { error } = require("console");
const fs = require("fs");
const path = require("path");
const { stdout, stderr } = require("process");
const { v4: uuid } = require("uuid");
const generateInput = require("./generateInput");
const generateOutput = require("./generateOutput");

const outputPath = path.join(__dirname, "compiledFiles");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, input) => {
  const inputFile = generateInput(input);
  const outputFile = generateOutput();
  const jobid = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobid}.out`);
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .//${jobid}.out < ${inputFile} > ${outputFile}`,
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
module.exports = executeCpp;
