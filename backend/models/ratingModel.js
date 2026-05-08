import mongoose from "mongoose";


const ratingSchema = new mongoose.Schema({

    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    driverId:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    }

},{timestamps:true})


export const Rating = mongoose.model("Rating",ratingSchema)