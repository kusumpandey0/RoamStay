const express =require("express");
const verifyToken = require("../middleware/VerifyToken");
const destinationController=require('../controller/destinationController')
const router=express.Router();

router.post('/create',verifyToken,destinationController)