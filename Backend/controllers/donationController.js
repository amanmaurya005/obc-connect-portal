import Donation from "../models/Donation.js";


// Create donation
export const createDonation = async (req, res) => {
  try {
    const {
      amount,
      cause,
      name,
      email,
      mobile,
      pan,
      anonymous,
      message,
    } = req.body;

    if (!amount || !cause) {
      return res.status(400).json({
        success: false,
        message: "Amount and cause required",
      });
    }

    const donation = new Donation({
      amount,
      cause,
      name,
      email,
      mobile,
      pan,
      anonymous,
      message,
    });

    await donation.save();

    res.status(201).json({
      success: true,
      message: "Donation created successfully",
      data: donation,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: donations,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get single donation
export const getDonationById = async (req, res) => {
  try {

    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.json({
      success: true,
      data: donation,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};