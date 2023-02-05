const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://Matthew:Whakedw1@cluster0.men6wel.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("Connected to database"));

module.exports = mongoose;

// "use strict";

// const mongoose = require("mongoose");

// mongoose.set("strictQuery", true);
// const uri = "mongodb://localhost:27017/";

// async function run() {
//   try {
//     await mongoose.connect(uri);
//     console.log("connected succesfully!!");
//   } catch (err) {
//     console.log(err);
//   }
// }
// run();
