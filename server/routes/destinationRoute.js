const express =require("express");
const verifyToken = require("../middleware/VerifyToken");
const{createDestination,fetchDestinations}=require('../controller/destinationController')
const {upload}=require('../middleware/upload')
const router=express.Router();

try{
    router.post('/create',verifyToken,upload,createDestination)
    router.get('/read',fetchDestinations)

}catch(err){
    console.log("error in route");
    
}
module.exports=router