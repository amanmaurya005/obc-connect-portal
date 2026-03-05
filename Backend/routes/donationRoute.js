import express from "express";
import {
  createDonation,
  getAllDonations,
  getDonationById,
} from "../controllers/donationController.js";

const router = express.Router();

router.post("/create", createDonation);

router.get("/all", getAllDonations);

router.get("/:id", getDonationById);

export default router;