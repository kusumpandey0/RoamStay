const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
  readproperty,
  createproperty,fetchPendingproperty,updatePropertyStatus,fetchSingleProperty
} = require("../controller/propertycontroller");
const { upload, storage } = require("../middleware/upload");
// Remove from index.js and put here instead
try {
  router.post("/create", verifyToken, upload, createproperty);
  router.get("/approvedProperty", readproperty);
  router.get('/pendingProperty',fetchPendingproperty)
  router.get('/singleProperty/:id',fetchSingleProperty)
  router.put("/changeStatus/:id",updatePropertyStatus)


} catch (err) {
  console.log("error in propertyroute", err);
}

module.exports = router;
