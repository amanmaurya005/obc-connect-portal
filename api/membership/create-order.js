import mongoose from "mongoose";
import { createOrder } from "../../Backend/controllers/membershipController.js";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectDB();

  return createOrder(req, res);
}