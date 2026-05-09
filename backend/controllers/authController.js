import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';


export const register = async (req, res) => {
    try {
        const { name, email, password, mobile, role } = req.body;
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({
                status: false,
                message: "All fields are required  "
            })
        }
        const existUser = await User.findOne({ email, mobile })
        if (existUser) {
            return res.status(409).json({
                status: false,
                message: "User already registered"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            mobile,
            role: role || "user",
            isApproved: role === "admin"
        })

        return res.status(201).json({
            status: true,
            message: role === "driver" ? "Driver registered, wait for admin approval" : "Register successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                isApproved: user.isApproved
            }
        });

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "Error in register user ",
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password required"
            });
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            })
        }
        if (user.isBlocked) {
            return res.status(403).json({
                status: false,
                message: "Your account is blocked"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Invalid password"
            })
        }

        if (user.role === "driver" && !user.isApproved) {
            return res.status(403).json({
                status: false,
                message: "Driver not approved by admin"
            });
        }
        const token = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
        return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        isApproved: user.isApproved,
        isBlocked: user.isBlocked
      }
    });
    } catch (error) {
        return res.status(500).json({
            message: `Error in login user ${error.message}`
        })
    }
}


export const profile = async (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Profile fetched",
    data: req.user
  });
};