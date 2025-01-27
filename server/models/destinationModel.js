const mongoose=require("mongoose");

const destinationSchema=mongoose.Schema({
    userId:{
        type:String
    },
    addedBy:{
        type:String,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    phnNumber:{
        type:String
    },
    destinationPhoto:{
        type:[String]
    },
    status:{
        type:String,
        enum:["pending","approved"],
        default:"pending"
    }
})

const Destination=mongoose.model("Destination",destinationSchema)
module.exports=Destination;


