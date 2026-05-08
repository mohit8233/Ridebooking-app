import mongoose from "mongoose";

const complainSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookingId:{
          type:mongoose.Schema.Types.ObjectId,
           ref:"Booking",
    },
    driverId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
    },
    adminResponse:{
        type:String
    },
    subject:{
         type:String,
         required:true
    },
    message:{
        type:String,
         required:true
    },
    status:{
        type:String,
       enm:["pending","resolved","rejected"],
       default:"pending"
    }
},{timestamps:true})


export const Complain = mongoose.model("Complain",complainSchema)