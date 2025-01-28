const express =require("express");
const verifyToken = require("../middleware/VerifyToken");
const{createDestination,fetchDestinations,changeDestStatus,fetchPendingDestinations}=require('../controller/destinationController')
const {upload}=require('../middleware/upload')
const router=express.Router();

try{
    router.post('/create',verifyToken,upload,createDestination)
    router.get('/approvedDestination',fetchDestinations)
    router.get('/pendingDestination',fetchPendingDestinations)
    router.put('/changeStatus/:id',changeDestStatus)

}catch(err){
    console.log("error in route");
    
}
module.exports=router