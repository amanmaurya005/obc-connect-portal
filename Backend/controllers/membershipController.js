import Membership from "../models/membershipModel.js";
import { Resend } from 'resend';
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



// const formatDate = (date) => {
//   if (!date) return "-";
//   const d = new Date(date);
//   return d.toLocaleDateString("en-IN"); 
// };



const formatDate = (date) => {
  if (!date) return "-";
  
  try {
   
    if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
    
    
    const d = new Date(date);
    
   
    if (isNaN(d.getTime())) return "-";
    
    // Format as DD/MM/YYYY
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    return "-";
  }
};



const numberToHindiWords = (num) => {
  const hindiMap = {
    100: "एक सौ मात्र",
    251: "दो सौ इक्यावन मात्र",
    500: "पाँच सौ मात्र",
    1000: "एक हजार मात्र",
  };
  return hindiMap[num] || num + " मात्र";
};



export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 251 * 100, 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    console.log(process.env.RAZORPAY_KEY_ID);
    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

   
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed ❌",
      });
    }


    
    return res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    });

  } catch (error) {
    console.log("Verification Error:", error);
    res.status(500).json({ error: error.message });
  }
};


const getCode = (text) => {
  if (!text) return "";
  return text.replace(/[^a-zA-Z]/g, "").substring(0, 2).toUpperCase();
};


export const createMembership = async (req, res) => {
  try { 
    
    const razorpayPaymentId = req.body.razorpay_payment_id;
    const razorpayOrderId = req.body.razorpay_order_id;
    const paymentStatus = razorpayPaymentId ? "success" : "pending";

    console.log("💰 Payment Details:", {
      razorpayPaymentId,
      razorpayOrderId,
      paymentStatus
    });

    
    if (!razorpayPaymentId) {
      console.error("❌ Missing payment ID!");
      return res.status(400).json({
        success: false,
        message: "Payment ID is required"
      });
    }

    
    const lastMember = await Membership.findOne({}, {}, { sort: { receiptNumber: -1 } });
    let newReceiptNumber = 1;

    if (lastMember && lastMember.receiptNumber) {
      newReceiptNumber = lastMember.receiptNumber + 1;
    }

    const stateCode = getCode(req.body.state);     
    const districtCode = getCode(req.body.district);
    const formattedNumber = String(newReceiptNumber).padStart(4, "0");
    const memberId = `${stateCode}${districtCode}${formattedNumber}`;
    
    
    const requiredFields = [
      "memberName",
      "fatherName",
      "mobile",
      "residenceAddress",
    ];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    let imagePath = null;
    if (req.file) {
      imagePath = req.file.path;
    } else if (req.body.image) {
      imagePath = req.body.image;
    }

    console.log("Image:", imagePath);

  
    if (req.body.pan && req.body.pan.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "PAN must be exactly 10 characters",
      });
    }

    const membership = new Membership({
    
      razorpayPaymentId: razorpayPaymentId,
      razorpayOrderId: razorpayOrderId,
      paymentStatus: paymentStatus,
      paymentDate: razorpayPaymentId ? new Date() : null,

      memberId: memberId,
      receiptNumber: newReceiptNumber,
      membershipFee: req.body.membershipFee ? parseInt(req.body.membershipFee) : 251,

      memberName: req.body.memberName,
      fatherName: req.body.fatherName,
      businessNature: req.body.businessNature,
      organizationPosition: req.body.organizationPosition,
      residenceAddress: req.body.residenceAddress,
      officeAddress: req.body.officeAddress,
      residencePhone: req.body.residencePhone,
      officePhone: req.body.officePhone,
      mobile: req.body.mobile,
      whatsapp: req.body.whatsapp,
      email: req.body.email || null,
      pan: req.body.pan,
      aadhaar: req.body.aadhaar,
      education: req.body.education,
      otherEducation: req.body.otherEducation,
      dob: req.body.dob ? new Date(req.body.dob) : null,
      marriageDate: req.body.marriageDate ? new Date(req.body.marriageDate) : null,
      bloodGroup: req.body.bloodGroup,
      tshirtSize: req.body.tshirtSize,
      socialWork: req.body.socialWork,
      specialAchievement: req.body.specialAchievement,
      membershipType: req.body.membershipType,
      state: req.body.state,
      district: req.body.district,
      vidhansabha: req.body.vidhansabha,
      image: req.file?.path || req.body.image,
    });
    
    console.log("📝 Membership object created with payment:", {
      hasPaymentId: !!membership.razorpayPaymentId,
      paymentStatus: membership.paymentStatus
    });

    await membership.save();
  
    
    console.log("🔍 Final saved data:", {
      memberId: membership.memberId,
      receiptNumber: membership.receiptNumber,
      paymentStatus: membership.paymentStatus,
      razorpayPaymentId: membership.razorpayPaymentId,
      razorpayOrderId: membership.razorpayOrderId
    });

    const amount = req.body.membershipFee || 251;
    const amountWords = numberToHindiWords(amount);
    const panFormatted = (req.body.pan || " ").padEnd(10, " ").split("").join(" ");

  
    try {
      await resend.emails.send({
        from: "OBC Mahasabha <no-reply@obcmahasabha.co.in>",
        to: ["info@obcmahasabha.co.in"],
        subject: `🆕 New Membership Form Submitted - ${req.body.memberName}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color:#2c3e50;">New Membership Registration Received</h2>
            <table border="1" cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse;">
              <thead>
                <tr><th align="left">Field</th><th align="left">Details</th></tr>
              </thead>
              <tbody>
                <tr><td>Member Name</td><td>${req.body.memberName || "-"}</td></tr>
                <tr><td>Father Name</td><td>${req.body.fatherName || "-"}</td></tr>
                <tr><td>Email</td><td>${req.body.email || "-"}</td></tr>
                <tr><td>Mobile</td><td>${req.body.mobile || "-"}</td></tr>
                <tr><td>WhatsApp</td><td>${req.body.whatsapp || "-"}</td></tr>
                <tr><td>Date of Birth</td><td>${formatDate(req.body.dob)}</td></tr>
                <tr><td>Marriage Date</td><td>${formatDate(req.body.marriageDate)}</td></tr>
                <tr><td>Business Nature</td><td>${req.body.businessNature || "-"}</td></tr>
                <tr><td>Organization Position</td><td>${req.body.organizationPosition || "-"}</td></tr>
                <tr><td>Residence Address</td><td>${req.body.residenceAddress || "-"}</td></tr>
                <tr><td>Office Address</td><td>${req.body.officeAddress || "-"}</td></tr>
                <tr><td>State</td><td>${req.body.state || "-"}</td></tr>
                <tr><td>District</td><td>${req.body.district || "-"}</td></tr>
                <tr><td>Vidhansabha</td><td>${req.body.vidhansabha || "-"}</td></tr>
                <tr><td>Education</td><td>${req.body.education || "-"}</td></tr>
                <tr><td>Other Education</td><td>${req.body.otherEducation || "-"}</td></tr>
                <tr><td>Blood Group</td><td>${req.body.bloodGroup || "-"}</td></tr>
                <tr><td>T-Shirt Size</td><td>${req.body.tshirtSize || "-"}</td></tr>
                <tr><td>Social Work</td><td>${req.body.socialWork || "-"}</td></tr>
                <tr><td>Special Achievement</td><td>${req.body.specialAchievement || "-"}</td></tr>
                <tr><td>Membership Type</td><td>${req.body.membershipType || "-"}</td></tr>
                <tr><td>Membership Fee</td><td>₹${req.body.membershipFee || "251"}</td></tr>
                <tr><td>PAN</td><td>${req.body.pan || "-"}</td></tr>
                <tr><td>Aadhaar</td><td>${req.body.aadhaar || "-"}</td></tr>
                <tr><td>Profile Image</td><td>${req.file?.path ? `<img src="${req.file.path}" width="100" />` : "-"}</td></tr>
              </tbody>
            </table>
            <br/>
            <p style="color:gray;">This email was automatically generated from the membership form.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("❌ Failed to send admin email:", emailError.message);
    }

   
    if (req.body.email && req.body.email.trim() !== "") {
      try {
        await resend.emails.send({
          from: "OBC Mahasabha <no-reply@obcmahasabha.co.in>",
          to: [req.body.email],
          subject: "🧾 सदस्यता रसीद - अखिल भारतीय संयुक्त ओ.बी.सी. महासभा",
          html: `
            <div style="max-width:700px; margin:20px auto; background-color:#f38cb4; padding:30px; border:2px solid #333; font-family: Arial; color:#1a1a1a;">
              <table width="100%" style="font-size:12px; font-weight:bold;">
                <tr>
                  <td>Regd. No. 216/JAIPUR/2024<br>PAN NO.: AAKTA5604N</td>
                  <td style="text-align:center; font-size:18px;">रसीद</td>
                  <td style="text-align:right;">Mob.: 9549566300</td>
                </tr>
              </table>
              <div style="text-align:center; margin-top:10px;">
                <h1 style="margin:0; font-size:26px;">अखिल भारतीय संयुक्त ओ.बी.सी. महासभा</h1>
                <p style="margin:5px 0; font-size:13px; font-weight:bold;">पंजीकृत प्रधान कार्यालय : प्लॉट नं. 115-116, विनायक विहार-डी,<br>हरनाथपुरा, कालवाड़ रोड़, जयपुर-302012</p>
              </div>
              <br>
              <table width="100%" style="font-weight:bold; margin-bottom:10px;">
                <tr>
                  <td width="50%">क्रमांक : <span style="color:red; font-size:22px;">${String(newReceiptNumber).padStart(4, "0")}</span></td>
                  <td style="text-align:right;">दिनांक : ${new Date().toLocaleDateString("en-IN")}</td>
                </tr>
              </table>
              <div style="line-height:2.2; font-weight:bold;">
                <div style="border-bottom:1px dotted #333;">श्रीमान्/श्रीमती/सुश्री : <span style="font-weight:normal;"> ${req.body.memberName}</span></div>
                <div style="border-bottom:1px dotted #333;">पता : <span style="font-weight:normal;"> ${req.body.residenceAddress}</span><span style="float:right;">मो.: <span style="font-weight:normal;">${req.body.mobile || "-"}</span></span></div>
                <div style="border-bottom:1px dotted #333;">सदस्यता प्रकार : <span style="font-weight:normal;">${req.body.membershipType === "life" ? "आजीवन सदस्य" : "वार्षिक सदस्य"}</span></div>
                <div style="border-bottom:1px dotted #333;">जिला : <span style="font-weight:normal;">${req.body.district || "-"}</span> विधानसभा : <span>${req.body.vidhansabha || "-"}</span><span style="float:right;">राज्य : <span style="font-weight:normal;">${req.body.state || "-"}</span></span></div>
                <div style="border-bottom:1px dotted #333;">से रुपये (शब्दों में) : <span style="font-weight:normal;">${amountWords}</span></div>
                <div style="border-bottom:1px dotted #333;">नकद/बैंक/ऑनलाइन सधन्यवाद प्राप्त किये।<span style="float:right;">PAN : <span style="border:1px solid #000; padding:3px 8px; font-family:monospace; letter-spacing:3px;">${panFormatted}</span></span></div>
              </div>
              <br>
              <table width="100%" style="margin-top:10px;">
                <tr><td width="40%" style="border:2px solid #000; text-align:center; padding:10px;"><span style="font-size:35px; font-weight:bold;">₹ ${amount}</span></td></tr>
              </table>
            </div>
          `,
        });
        
      } catch (emailError) {
        console.error("❌ Failed to send user receipt:", emailError.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Membership saved successfully",
      memberId: membership.memberId,
      receiptNumber: membership.receiptNumber,
      paymentStatus: paymentStatus,
      paymentId: razorpayPaymentId
    });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ receiptNumber: -1 });

    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch memberships",
      error: error.message,
    });
  }
};

export const getSingleMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Membership not found",
      });
    }

    res.status(200).json({
      success: true,
      data: membership,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching membership",
      error: error.message,
    });
  }
};




export const getReceipt = async (req, res) => {
  try {
    const { memberId } = req.params;
    
    const membership = await Membership.findOne({ memberId });
    
    if (!membership) {
      return res.status(404).json({ error: "Member not found" });
    }
    
    res.json({
      receiptNumber: membership.receiptNumber,
      memberName: membership.memberName,
      residenceAddress: membership.residenceAddress,
      mobile: membership.mobile,
      membershipType: membership.membershipType,
      district: membership.district,
      vidhansabha: membership.vidhansabha,
      state: membership.state,
      membershipFee: membership.membershipFee,
      pan: membership.pan,
      createdAt: membership.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};