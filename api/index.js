import express from "express";
import cors from "cors";

import connectDB from "../Backend/config/db.js";
import membershipRoute from "../Backend/routes/membershipRoute.js";
import donationRoute from "../Backend/routes/donationRoute.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/membership", membershipRoute);
app.use("/api/donations", donationRoute);

export default app;