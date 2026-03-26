import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({

  razorpayPaymentId: {
    type: String,
    sparse: true,
    index: true
  },
  razorpayOrderId: {
    type: String,
    sparse: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  paymentDate: {
    type: Date
  },

  memberId: {
    type: String,
    required: true,
  },

  receiptNumber: {
    type: Number,
    required: true,
    unique: true
  },

  membershipFee: {
    type: Number,
    default: 251,
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
    lowercase: true,
    trim: true,
    default: null
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

  vidhansabha: {
    type: String,
    required: [true, "Vidhansabha is required"]
  },

 
  image: {
    type: String,
    required: [true, "Profile image is required"]
  }
}, { 
  timestamps: true 
});


membershipSchema.index({ email: 1 }, { sparse: true });
membershipSchema.index({ mobile: 1 });

export default mongoose.models.Membership ||
mongoose.model("Membership", membershipSchema);
