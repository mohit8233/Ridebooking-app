import { Complain } from "../models/complainModel.js";

export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complain.create({
      ...req.body,
      userId: req.user._id
    });

    return res.status(201).json({
      status: true,
      message: "Complaint created",
      data: complaint
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const myComplaints = async (req, res) => {
  try {
    const complaints = await Complain.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "My complaints fetched",
      data: complaints
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const allComplaints = async (req, res) => {
  try {
    const complaints = await Complain.find()
      .populate("userId", "name email")
      .populate("driverId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "All complaints fetched",
      data: complaints
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const resolveComplaint = async (req, res) => {
  try {
    const { adminResponse } = req.body;

    const complaint = await Complain.findByIdAndUpdate(
      req.params.id,
      {
        status: "resolved",
        adminResponse
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Complaint resolved",
      data: complaint
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};