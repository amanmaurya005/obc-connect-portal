// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// import membershipRoute from "./routes/membershipRoute.js";
// import donationRoute from "./routes/donationRoute.js";

// dotenv.config();

// const PORT = process.env.PORT ;

// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static("uploads"));

// app.use("/api/membership", membershipRoute);
// app.use("/api/donations", donationRoute);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

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
import serverless from "serverless-http";

import connectDB from "./config/db.js";
import membershipRoute from "./routes/membershipRoute.js";
import donationRoute from "./routes/donationRoute.js";

dotenv.config();

const app = express();

connectDB();

const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:5173",
    "https://www.obcmahasabha.co.in",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/membership", membershipRoute);
app.use("/donations", donationRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default serverless(app);