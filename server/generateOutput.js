const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "outputs");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateOutput = () => {
  const jobid = uuid();
  const filename = `${jobid}.txt`;
  const filePath = path.join(dirCodes, filename);
  return filePath;
};

module.exports = generateOutput;
