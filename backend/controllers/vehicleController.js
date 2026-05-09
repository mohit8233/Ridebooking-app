import { Vehicle } from "../models/vehicleModel.js";

export const createVehicle = async (req, res) => {
  try {
    const {
      vehicleType,
      vehicleName,
      vehicleNumber,
      baseFare,
      perKmRate
    } = req.body;

    if (!vehicleType || !vehicleName || !vehicleNumber || !baseFare || !perKmRate) {
      return res.status(400).json({
        status: false,
        message: "All required fields are required"
      });
    }

    const existVehicle = await Vehicle.findOne({ vehicleNumber });

    if (existVehicle) {
      return res.status(409).json({
        status: false,
        message: "Vehicle already exists"
      });
    }

    const vehicle = await Vehicle.create({
      ...req.body,
      driverId: req.user._id
    });

    return res.status(201).json({
      status: true,
      message: "Vehicle created, wait for admin verification",
      data: vehicle
    });

  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate("driverId", "name email mobile");

    return res.status(200).json({
      status: true,
      message: "Vehicles fetched",
      data: vehicles
    });

  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const myVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      driverId: req.user._id
    });

    return res.status(200).json({
      status: true,
      message: "My vehicles fetched",
      data: vehicles
    });

  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const verifyVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found"
      });
    }

    if (vehicle.isVerified) {
      return res.status(400).json({
        status: false,
        message: "Vehicle already verified"
      });
    }

    vehicle.isVerified = true;
    await vehicle.save();

    return res.status(200).json({
      status: true,
      message: "Vehicle verified",
      data: vehicle
    });

  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};