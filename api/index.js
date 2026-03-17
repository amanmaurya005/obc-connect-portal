import express from "express";
import cors from "cors";
import serverless from "serverless-http";

// ✅ Try-Catch for import
let app;
try {
  // ✅ Import main backend app
  const backendModule = await import("../Backend/index.js");
  app = backendModule.default;
  console.log("✅ Backend imported successfully");
} catch (error) {
  console.error("❌ Failed to import backend:", error.message);
  
  // ✅ Fallback app if import fails
  const fallbackApp = express();
  fallbackApp.get("*", (req, res) => {
    res.status(500).json({
      error: "Backend import failed",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  });
  app = fallbackApp;
}

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
};

app.use(cors(corsOptions));

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// ✅ Debug route to check environment
app.get("/api/debug", (req, res) => {
  res.json({
    env: process.env.NODE_ENV,
    hasMongoUri: !!process.env.MONGODB_URI,
    hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
    nodeVersion: process.version
  });
});

// ✅ Vercel handler
export const handler = serverless(app);

// ✅ Optional: Handle warmup requests
export const config = {
  api: {
    bodyParser: false, // Disable for file uploads
  },
};