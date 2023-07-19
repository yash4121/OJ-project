const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "inputs");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateInput = (input) => {
  const jobid = uuid();
  const filename = `${jobid}.txt`;
  const filePath = path.join(dirCodes, filename);
  fs.writeFileSync(filePath, input);
  return filePath;
};
module.exports = generateInput;
