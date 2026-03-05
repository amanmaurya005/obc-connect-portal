import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import membershipRoute from "./routes/membershipRoute.js";
import donationRoute from "./routes/donationRoute.js";

dotenv.config();

const PORT = process.env.PORT ;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/membership", membershipRoute);
app.use("/api/donations", donationRoute);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});