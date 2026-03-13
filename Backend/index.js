
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// import membershipRoute from "./routes/membershipRoute.js";
// import donationRoute from "./routes/donationRoute.js";

// dotenv.config();

// const app = express();

// // ✅ PORT fallback
// const PORT = process.env.PORT || 3000;

// // Database Connection
// connectDB();

// // -------- CORS CONFIG --------
// const corsOptions = {
//   origin: [
//     "http://localhost:8080",
//     "http://localhost:5173",
//     "https://www.obcmahasabha.co.in"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// };
// app.use(cors(corsOptions));
// // -----------------------------

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static folder
// app.use("/uploads", express.static("uploads"));

// // API Routes 
// app.use("/api/membership", membershipRoute);
// app.use("/api/donations", donationRoute);

// // Root route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Server start
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import membershipRoute from "./routes/membershipRoute.js";
import donationRoute from "./routes/donationRoute.js";

dotenv.config();

const app = express();

// ✅ PORT fallback
const PORT = process.env.PORT || 3000;

// Database Connection
connectDB();

// -------- CORS CONFIG --------
const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:5173",
    "https://www.obcmahasabha.co.in"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};
app.use(cors(corsOptions));
// -----------------------------

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/membership", membershipRoute);
app.use("/api/donations", donationRoute);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});


// For Vercel serverless: export the app
export default app;