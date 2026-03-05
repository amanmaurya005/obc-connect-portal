import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({

  receiptNumber: {
    type: Number,
    required: true,
    unique: true
  },

  membershipFee: {
    type: Number,
    default: 200,
    min: 0
  },

  memberName: { type: String, required: [true, "Member name is required"] },
  fatherName: { type: String, required: [true, "Father name is required"] },

  businessNature: String,
  organizationPosition: String,

  residenceAddress: { type: String, required: [true, "Residence address is required"] },
  officeAddress: String,

  residencePhone: String,
  officePhone: String,

  mobile: { type: String, required: [true, "Mobile number is required"] },
  whatsapp: String,

  email: { 
    type: String, 
    required: [true, "Email is required"],
    lowercase: true,
    trim: true
  },

  pan: String,
  aadhaar: String,

  education: { type: String, required: [true, "Education is required"] },
  otherEducation: String,

  dob: { 
    type: Date, 
    required: [true, "Date of birth is required"]
  },
  marriageDate: Date,

  bloodGroup: { type: String, required: [true, "Blood group is required"] },
  tshirtSize: { type: String, required: [true, "T-shirt size is required"] },

  socialWork: String,
  specialAchievement: String,

  membershipType: {
    type: String,
    default: 'life'
  },

  state: { type: String, required: [true, "State is required"] },
  district: { type: String, required: [true, "District is required"] },

  // ✅ Cloudinary URL save होगा
  image: {
    type: String,
    required: [true, "Profile image is required"]
  }
}, { 
  timestamps: true 
});

// Index for faster queries
membershipSchema.index({ email: 1 });
membershipSchema.index({ mobile: 1 });

export default mongoose.model("Membership", membershipSchema);
