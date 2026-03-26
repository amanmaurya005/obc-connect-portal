import express from "express";
import { uploadCloud } from "../middleware/cloudinaryUpload.js"
import { createMembership, createOrder, getAllMemberships, getReceipt, getSingleMembership,verifyPayment  } from "../controllers/membershipController.js";

const router = express.Router();

router.post("/register", uploadCloud.single("imageFile"), createMembership);
router.get("/", getAllMemberships);          
router.get("/:id", getSingleMembership);  

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
// In your routes file
router.get("/receipt/:memberId", getReceipt);

export default router;