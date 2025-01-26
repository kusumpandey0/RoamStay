const router = require("express").Router();
const createProperty = require("../controller/propertycontroller");
const VerifyToken = require("../middleware/VerifyToken");
console.log("hi");
try {
  router.post("/create", VerifyToken, createProperty);
} catch (err) {
  console.log(err);
}
module.exports = router;
