const TravelGuide=require('../models/travelGuideModel')

const createTravelGuide=async(req,res)=>{
   try{
    const{name,email,phone,languages,experience,locations,about}=req.body;
    const photo=req.files.photo;
    console.log(req.files);
    
    const certificate=req.files.certificate;

    const citizenship=req.files.citizenship;

    if (
        !name || !phone || !languages || !experience || !locations || !about ||
        !photo || photo.length === 0 ||
        !certificate || certificate.length === 0 ||
        !citizenship || citizenship.length === 0
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

        const photoPath=photo[0].path;
      const certificatePath=certificate[0].path;
      const citizenshipPath=citizenship.map((photo)=>photo.path)


   const data= await TravelGuide.create({
        name,email,
        phone,languages,experience,locations,about,
        profilePhoto:photoPath,
        guideCertificate:certificatePath,
        citizenship:citizenshipPath

    })
    if(data){
        res.status(201).json({
            data,
            message:"Travel Guide Registered"
        })
    }

    
   }catch(err){
    console.log("Error ho"+err);
    
        res.status(500).json({
            message:"unable to register guide"
        })    
   }
    
}


const fetchTravelGuide=async(req,res)=>{

    try{
        const travelGuideData=await TravelGuide.find();
        if(travelGuideData){
            res.status(200).json({
                data:travelGuideData,
                message:"Travel Guide Data fetched Successfully"
            })
        }

    }catch(err){
        res.status(500).json({
            message:"Unable to fetch Travel Guide"
        })
    }
}

module.exports={createTravelGuide,fetchTravelGuide}