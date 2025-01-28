const express = require("express");
const verifyToken = require("../middleware/VerifyToken");
const { upload } = require("../middleware/upload");
const {
  createTravelGuide,
  fetchTravelGuide,
  fetchPendingTravelGuide,
  updateTravelGuideStatus,
} = require("../controller/travelGuideController");
const router = express.Router();

router.post("/create", verifyToken, upload, createTravelGuide);
router.get("/approvedGuide", fetchTravelGuide);
router.get("/pendingGuide", fetchPendingTravelGuide);
router.put("/changeStatus/:id", updateTravelGuideStatus);

module.exports = router;
