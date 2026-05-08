import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        vehicleType: {
            type: String,
            enum: ["bike", "auto", "car", "suv"],
            required: true
        },

        vehicleName: {
            type: String,
            required: true
        },

        vehicleNumber: {
            type: String,
            required: true,
            unique: true
        },

        vehicleColor: String,

        seatingCapacity: {
            type: Number,
            default: 4
        },

        baseFare: {
            type: Number,
            required: true
        },

        perKmRate: {
            type: Number,
            required: true
        },

        perMinuteRate: {
            type: Number,
            default: 1
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);