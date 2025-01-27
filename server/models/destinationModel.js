const mongoose=require("mongoose");

const destinationSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
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