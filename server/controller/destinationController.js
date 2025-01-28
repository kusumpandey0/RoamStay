const Destination=require("../models/destinationModel")
const User=require('../models/User')
const createDestination=async(req,res)=>{
    try{
        const {id,firstname}=req.user;
        
        const{title,description}=req.body;
        const destImages=req.files.images;
        

        const destImagesPath=destImages.map((file)=>file.path)
            console.log("yo"+destImagesPath);
            
        if(!title||!description){
            return res.status(400).json({
                error:"TItle and description is required"
            })
        }

        if(req.files&&(req.files).length===0){
            return res.status(400).json({
                error:"no fields uploaded"
            })
        } 
         const details=await User.findById(id);
         console.log(details);
               
        const newDestination={
            userId:id,
            addedBy:firstname,
            phnNumber:details?.phonenumber||null,
            title,
            description,
            destinationPhoto:destImagesPath
        }

        const newDestionation=   await Destination.create(newDestination)
      
        if(newDestination){
            
            res.status(201).json({message:"Destination added successfully",
                data:newDestination
            })
        }
}catch(err){
        console.log("error creating destination",err);
        
    }
}




const fetchDestinations=async(req,res)=>{
    console.log("hello");
    
    try{
        const destinationData=await Destination.find();
        console.log(destinationData);
        if(destinationData){
            res.status(200).json({
                data:destinationData,
                message:"Data fetched successfully"
            })
        }
        
    }catch(err){
        console.log(err);
        
    }

}
module.exports={createDestination,fetchDestinations}