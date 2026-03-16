// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import serverless from "serverless-http";

// import connectDB from "./config/db.js";
// import membershipRoute from "./routes/membershipRoute.js";
// import donationRoute from "./routes/donationRoute.js";

// dotenv.config();

// const app = express();

// connectDB();

// const corsOptions = {
//   origin: [
//     "http://localhost:8080",
//     "http://localhost:5173",
//     "https://www.obcmahasabha.co.in",
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static("uploads"));

// app.use("/api/membership", membershipRoute);
// app.use("/api/donations", donationRoute);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`API server is running locally on port ${PORT}`);
//   });
// }

// export default serverless(app);






import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/membership", membershipRoute);
app.use("/api/donations", donationRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
}); 


export default app;