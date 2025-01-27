const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
  readproperty,
  createproperty,
} = require("../controller/propertycontroller");
const { upload, storage } = require("../middleware/upload");
// Remove from index.js and put here instead
try {
  router.post("/create", verifyToken, upload, createproperty);
  router.get("/read", readproperty);
} catch (err) {
  console.log("error in propertyroute", err);
}

module.exports = router;
