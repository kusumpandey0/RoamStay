const mongoose=require("mongoose");

const travelGuideSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:Number
    },
    languages:{
        type:String
    },
    experience:{
        type:Number
    },
    locations:{
        type:String
    },
    about:{
        type:String
    },
    profilePhoto:{
        type:String
    },
    guideCertificate:{
        type:String,
    },
    citizenship:{
        type:[String],
    },
    status:{
        type:String,
        enum:["pending","approved"],
        default:"pending"
    }
})

const TravelGuide=mongoose.model("TravelGuide",travelGuideSchema);
module.exports=TravelGuide;