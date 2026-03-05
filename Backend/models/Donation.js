import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    cause: {
      type: String,
      required: true,
      enum: ["general", "education", "health", "support", "legal"],
    },

    name: {
      type: String,
      required: function () {
        return !this.anonymous;
      },
    },

    email: {
      type: String,
      required: function () {
        return !this.anonymous;
      },
    },

    mobile: {
      type: String,
      required: function () {
        return !this.anonymous;
      },
    },

    pan: {
      type: String,
      default: "",
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
      default: "pending",
      enum: ["pending", "success", "failed"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Donation", donationSchema);