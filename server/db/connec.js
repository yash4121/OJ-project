const mongoose = require("mongoose");

// const DB =
const DB =
  "mongodb://yashyeltiwar01:Yash%40123456@ac-boaqvhw-shard-00-00.ecybspw.mongodb.net:27017,ac-boaqvhw-shard-00-01.ecybspw.mongodb.net:27017,ac-boaqvhw-shard-00-02.ecybspw.mongodb.net:27017/AuthUsers?ssl=true&replicaSet=atlas-f0dwt1-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });
