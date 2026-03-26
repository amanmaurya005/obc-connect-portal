import express from "express";
import {
  createDonation,
  createDonationOrder,
  getAllDonations,
  getDonationById,
  verifyDonationPayment,
} from "../controllers/donationController.js";

const router = express.Router();
// -------
router.post("/create", createDonation);

router.get("/all", getAllDonations);

router.get("/:id", getDonationById);


router.post("/create-order", createDonationOrder);
router.post("/verify-payment", verifyDonationPayment);

export default router;