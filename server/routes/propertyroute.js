const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
  upload,
  propertycontroller,
} = require("../controller/propertycontroller");

// Remove from index.js and put here instead
try {
  router.post("/create", verifyToken, upload, propertycontroller);
  router.get("/read", propertycontroller);
} catch (err) {
  console.log("error in propertyroute", err);
}

module.exports = router;
