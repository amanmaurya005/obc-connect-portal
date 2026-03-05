import Membership from "../models/membershipModel.js";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";



import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ Date Format Function
const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("en-IN"); // Indian format
};

// ✅ Enhanced Hindi Amount Words Function
const numberToHindiWords = (num) => {
  const hindiMap = {
    100: "एक सौ मात्र",
    200: "दो सौ मात्र",
    500: "पाँच सौ मात्र",
    1000: "एक हजार मात्र"
  };
  return hindiMap[num] || num + " मात्र";
};


// ✅ Get Last Receipt Number


export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 200 * 100, // ₹200 fixed
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};


export const createMembership = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);


    const lastMember = await Membership.findOne().sort({ receiptNumber: -1 });

let newReceiptNumber = 1;

if (lastMember && lastMember.receiptNumber) {
  newReceiptNumber = lastMember.receiptNumber + 1;
}
    // ✅ Added required field validation
    const requiredFields = ['memberName', 'fatherName', 'mobile', 'residenceAddress'];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image required",
      });
    }

    // ✅ PAN validation
    if (req.body.pan && req.body.pan.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "PAN must be exactly 10 characters"
      });
    }

    const membership = new Membership({
      receiptNumber: newReceiptNumber,

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
      email: req.body.email,
      pan: req.body.pan,
      aadhaar: req.body.aadhaar,
      education: req.body.education,
      otherEducation: req.body.otherEducation,
      dob: req.body.dob ? new Date(req.body.dob) : null,
      marriageDate: req.body.marriageDate ? new Date(req.body.marriageDate) : null, // ✅ Fixed null check
      bloodGroup: req.body.bloodGroup,
      tshirtSize: req.body.tshirtSize,
      socialWork: req.body.socialWork,
      specialAchievement: req.body.specialAchievement,
      membershipType: req.body.membershipType,
      membershipFee: req.body.membershipFee ? parseInt(req.body.membershipFee) : 200,
      state: req.body.state,
      district: req.body.district,
      image: req.file.path,
    });

    await membership.save();

    const amount = req.body.membershipFee || 200;
    const amountWords = numberToHindiWords(amount);

    // PAN box format
    const panFormatted = (req.body.pan || "          ")
    .padEnd(10, " ")
    .split("")
    .join(" ");

    // ✅ Updated Email Template
    const msg = {
      to: "info@obcmahasabha.co.in",
      from: "info@obcmahasabha.co.in",
      subject: `🆕 New Membership Form Submitted - ${req.body.memberName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
         <h2 style="color:#2c3e50;">New Membership Registration Received</h2>

         <table border="1" cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse;">
           <tr><th align="left">Field</th><th align="left">Details</th></tr>

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

           <tr><td>Education</td><td>${req.body.education || "-"}</td></tr>
           <tr><td>Other Education</td><td>${req.body.otherEducation || "-"}</td></tr>

           <tr><td>Blood Group</td><td>${req.body.bloodGroup || "-"}</td></tr>
           <tr><td>T-Shirt Size</td><td>${req.body.tshirtSize || "-"}</td></tr>

           <tr><td>Social Work</td><td>${req.body.socialWork || "-"}</td></tr>
           <tr><td>Special Achievement</td><td>${req.body.specialAchievement || "-"}</td></tr>

           <tr><td>Membership Type</td><td>${req.body.membershipType || "-"}</td></tr>
           <tr><td>Membership Fee</td><td>₹${req.body.membershipFee || "200"}</td></tr>

           <tr><td>PAN</td><td>${req.body.pan || "-"}</td></tr>
           <tr><td>Aadhaar</td><td>${req.body.aadhaar || "-"}</td></tr>

           <tr>
             <td>Profile Image</td>
             <td>
               ${
                 req.file?.path
                   ? `<img src="${req.file.path}" width="100" height="100" style="object-fit:cover;border-radius:5px;" />`
                   : "-"
               }
             </td>
           </tr>

         </table>

         <br/>
         <p style="color:gray;">This email was automatically generated from the membership form.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

  
const userReceipt = {
  to: req.body.email,
  from: "info@obcmahasabha.co.in",
  subject: "🧾 सदस्यता रसीद - अखिल भारतीय संयुक्त ओ.बी.सी. महासभा",
  html: `
    <div style="max-width:700px; margin:20px auto; background-color:#f38cb4; padding:30px; border:2px solid #333; font-family: Arial; color:#1a1a1a; position: relative;">
      
      <table width="100%" style="font-size:12px; font-weight:bold;">
        <tr>
          <td>
            Regd. No. 216/JAIPUR/2024<br>
            PAN NO.: AAKTA5604N
          </td>
          <td style="text-align:center; font-size:18px;">रसीद</td>
          <td style="text-align:right;">Mob.: 9549566300</td>
        </tr>
      </table>

      <div style="text-align:center; margin-top:10px;">
        <h1 style="margin:0; font-size:26px;">
          अखिल भारतीय संयुक्त ओ.बी.सी. महासभा
        </h1>
        <p style="margin:5px 0; font-size:13px; font-weight:bold;">
          पंजीकृत प्रधान कार्यालय : प्लॉट नं. 115-116, विनायक विहार-डी,<br>
          हरनाथपुरा, कालवाड़ रोड़, जयपुर-302012
        </p>
      </div>

      <br>

      <table width="100%" style="font-weight:bold; margin-bottom:10px;">
        <tr>
          <td width="50%">
            क्रमांक :
            <span style="color:red; font-size:22px;">
            ${String(newReceiptNumber).padStart(4, "0")}
            </span>
          </td>
          <td style="text-align:right;">
            दिनांक : ${new Date().toLocaleDateString("en-IN")}
          </td>
        </tr>
      </table>

      <div style="line-height:2.2; font-weight:bold;">
        <div style="border-bottom:1px dotted #333;">
          श्रीमान्/श्रीमती/सुश्री :
          <span style="font-weight:normal;"> ${req.body.memberName}</span>
        </div>

        <div style="border-bottom:1px dotted #333;">
          पता :
          <span style="font-weight:normal;"> ${req.body.residenceAddress}</span>
          <span style="float:right;">
            मो.: <span style="font-weight:normal;">
              ${req.body.mobile || "-"}
            </span>
          </span>
        </div>

        <div style="border-bottom:1px dotted #333;">
          सदस्यता प्रकार :
          <span style="font-weight:normal;">
            ${req.body.membershipType || "-"}
          </span>
        </div>

        <div style="border-bottom:1px dotted #333;">
          जिला :
          <span style="font-weight:normal;">
            ${req.body.district || "-"}
          </span>
          <span style="float:right;">
            राज्य :
            <span style="font-weight:normal;">
              ${req.body.state || "-"}
            </span>
          </span>
        </div>

        <div style="border-bottom:1px dotted #333;">
          से रुपये (शब्दों में) :
          <span style="font-weight:normal;">
            ${amountWords}
          </span>
        </div>

        <div style="border-bottom:1px dotted #333;">
          नकद/बैंक/ऑनलाइन सधन्यवाद प्राप्त किये।
          <span style="float:right;">
            PAN :
            <span style="border:1px solid #000; padding:3px 8px; font-family:monospace; letter-spacing:3px;">
              ${panFormatted}
            </span>
          </span>
        </div>
      </div>

      <br>

      <table width="100%" style="margin-top:10px;">
        <tr>
          <td width="40%" style="border:2px solid #000; text-align:center; padding:10px;">
            <span style="font-size:35px; font-weight:bold;">
              ₹ ${amount}
            </span>
          </td>
        </tr>
      </table>
    </div>
  `
};

    await sgMail.send(userReceipt);

    return res.status(201).json({
      success: true,
      message: "Membership saved and admin notified successfully",
      data: membership,
    });

  } catch (error) {
    console.error("Error:", error.response?.body || error.message);

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
      data: memberships
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch memberships",
      error: error.message
    });
  }
};







export const getSingleMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Membership not found"
      });
    }

    res.status(200).json({
      success: true,
      data: membership
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching membership",
      error: error.message
    });
  }
};