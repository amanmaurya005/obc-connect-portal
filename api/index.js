// import serverless from "serverless-http";
// import app from "../Backend/index.js";

// export default serverless(app);




// api/index.js
import express from 'express';  // ES module के लिए
// या const express = require('express');  // CommonJS

const app = express();
app.use(express.json());
// app.use(cors());  // अगर लगाया है

// आपके सभी routes यहाँ import/add करें (membership, multer, etc.)
app.get('/test', (req, res) => res.json({ status: 'Working!' }));

// NO serverless-http, NO app.listen()
export default app;  // या module.exports = app;
