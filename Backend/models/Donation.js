import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  cause: {
    type: String,
    required: true,
    enum: ['education', 'health', 'legal', 'general', 'other'],
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  mobile: {
    type: Number,
    required: false,
  },
  pan: {
    type: String,
    required: false,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "",
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  razorpayOrderId: {
    type: String,
    default: null,
  },
  razorpayPaymentId: {
    type: String,
    default: null,
  },
  paymentDate: {
    type: Date,
    default: null,
  },

  paymentMethod: {
    type: String,
    enum: ["card", "upi", "netbanking", "wallet", "emi", "other"],
    default: "other",
  },
}, {
  timestamps: true,
});

export default mongoose.model("Donation", donationSchema);