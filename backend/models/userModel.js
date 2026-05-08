import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "driver", "admin"]
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },

    licenseNumber: {
        type: Number,
        required: function () {
            return this.role === "driver"
        }
    },
    vehicleNumber: {
        type: String,
        required: function () {
            return this.role === "driver"
        }
    },
    vehicleType: {
        type: String,
        enum: ["cars", "auto", "bike"],
        default: "cars",
        required: function () {
            return this.role === "driver"
        }
    },
    isAvailable: {
        type: Boolean,
        required: function () {
            return this.role === "driver"
        }
    },
    currentLocation: {
        type: String,
        required: true

    },

    rating: {
        type: Number,

    },
    totalRatings: {
        type: Number
    },
    totalEarning: {
        type: Number,
        required: function () {
            return this.role === "driver"
        }
    }

}, { timestamps: true })

export const User = mongoose.model("User", userSchema)