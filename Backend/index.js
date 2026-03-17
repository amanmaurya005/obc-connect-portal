import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import membershipRoute from "./routes/membershipRoute.js";
import donationRoute from "./routes/donationRoute.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup
const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:5173",
    "https://www.obcmahasabha.co.in",
    "https://obcmahasabha.co.in"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

// ✅ Database connection (with error handling)
try {
  await connectDB();
} catch (error) {
  console.error("Failed to connect to database:", error.message);
}

// ✅ Routes
app.use("/api/membership", membershipRoute);
app.use("/api/donations", donationRoute);

// ✅ Health check route
app.get("/api", (req, res) => {
  res.json({
    message: "API is running on Vercel!",
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// ✅ Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ 
    error: "Internal server error",
    message: err.message 
  });
});

// ✅ Local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running on http://localhost:${PORT}`);
    console.log(`📝 API available at http://localhost:${PORT}/api`);
  });
}

// ✅ Export for Vercel
export default app;