const express=require('express');
const verifyToken = require('../middleware/VerifyToken');
const { upload } = require('../middleware/upload');
const { createTravelGuide, fetchTravelGuide } = require('../controller/travelGuideController');
const router=express.Router();


    router.post('/create',verifyToken,upload,createTravelGuide);
    router.get('/read',fetchTravelGuide);


module.exports=router;
