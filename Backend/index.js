import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import membershipRoute from "./routes/membershipRoute.js";
import donationRoute from "./routes/donationRoute.js";
import adminRoute from './routes/adminRoute.js';
import cookieParser from 'cookie-parser';

// Add after express.json()


dotenv.config();
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:5173",
    "https://www.obcmahasabha.co.in",
    "https://obcmahasabha.co.in",
    "https://obc-connect-portal-1.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));


try {
  await connectDB();
} catch (error) {
  console.error("❌ Failed to connect to database:", error.message);
}


app.use("/api/membership", membershipRoute);
app.use("/api/donations", donationRoute);
app.use('/api/admin', adminRoute);


app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working!" });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});