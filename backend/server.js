import express from 'express'

import cors from 'cors'

import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { userRouter } from './routes/userRoutes.js';
import router from './routes/vehicleRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import payRouter from './routes/paymentRoutes..js';
import { ratingRouter } from './routes/ratingRoutes.js';
import complainRouter from './routes/complainRoutes.js';
import adminRouter from './routes/adminRoutes.js';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

await connectDB()
app.use("/api/auth",userRouter)
app.use("/api/vehicles", router);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", payRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/complaints", complainRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Cars Booking System API Running");
});


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})