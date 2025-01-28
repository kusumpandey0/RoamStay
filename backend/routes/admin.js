const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyAdmin } = require("../utils/verifyToken");

router.get("/dashboard", verifyAdmin, adminController.getDashboard);

module.exports = router; 