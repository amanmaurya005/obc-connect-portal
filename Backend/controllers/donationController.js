import Donation from "../models/Donation.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

// Create Razorpay order
export const createDonationOrder = async (req, res) => {
  try {
    const { amount, donationId } = req.body;

    if (!amount || !donationId) {
      return res.status(400).json({
        success: false,
        message: "Amount and donationId are required",
      });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise and ensure integer
      currency: "INR",
      receipt: `donation_${donationId}`,
      notes: {
        donationId: donationId,
      },
    };
    
    const order = await razorpay.orders.create(options);
    
    // Update donation with order ID
    await Donation.findByIdAndUpdate(donationId, {
      razorpayOrderId: order.id,
    });
    
    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
    
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Razorpay payment
export const verifyDonationPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationId,
    } = req.body;
    
    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");
    
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid signature" 
      });
    }
    
    // Update donation with payment details
    await Donation.findByIdAndUpdate(donationId, {
      paymentStatus: "success",
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      paymentDate: new Date(),
    });
    
    res.json({ 
      success: true, 
      message: "Payment verified successfully" 
    });
    
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};