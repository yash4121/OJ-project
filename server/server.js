const express = require("express");
require("./db/connec");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const bodyParser = require("body-parser");

const app = express();

// app.get('/', (req,res) => {
//     res.status(201).json("server created");
// })
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);
// app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("listening to port 8000");
});
