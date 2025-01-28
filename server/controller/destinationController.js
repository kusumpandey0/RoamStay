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
    try{
        const approvedDestionation=await Destination.find({status:"approved"});
        console.log(approvedDestionation);
        if(approvedDestionation){
            res.status(200).json({
                data:approvedDestionation,
                message:"Data fetched successfully"
            })
        }
        
    }catch(err){
        console.log(err);
        
    }
}

const fetchPendingDestinations=async(req,res)=>{
    console.log("pending destinations");
    try{
        const pendingDestionation=await Destination.find({status:"pending"});
        console.log(pendingDestionation);
        if(pendingDestionation){
            res.status(200).json({
                data:pendingDestionation,
                message:"Data fetched successfully"
            })
        }
        }catch(err){
        console.log(err);
        
    }
    
}

const changeDestStatus=async(req,res)=>{
    console.log("change destination status ma aayo");

    const {id}=req.params;
    const {status}=req.body;
    try{
        const destination=await Destination.findByIdAndUpdate(id,{status});

        if(!destination){
            return res.status(404).json({
                error:"Destination not Found"
            })
        }
        res.status(200).json({
            message:"Destination approved successfully",
            data:destination
        })

    }catch(err){
        res.status(500).json({
            message:"failed to update guide status"
        })
    }
}

module.exports={createDestination,fetchDestinations,changeDestStatus,fetchPendingDestinations}