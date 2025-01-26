const mongoose = require("mongoose");

async function connectToDb(URL) {
  try {
    await mongoose.connect(URL, {
      dbName: "UserRegistration",
    });
    console.log("db connected");
  } catch (err) {
    console.log("db not connected" + err.message);
  }
}
module.exports = connectToDb;
