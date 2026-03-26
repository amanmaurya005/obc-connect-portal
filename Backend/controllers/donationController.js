import Donation from "../models/Donation.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Resend } from "resend";


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const resend = new Resend(process.env.RESEND_API_KEY);


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


export const createDonationOrder = async (req, res) => {
  try {
    const { amount, donationId, paymentMethod } = req.body; 

    if (!amount || !donationId) {
      return res.status(400).json({
        success: false,
        message: "Amount and donationId are required",
      });
    }

    const options = {
      amount: Math.round(amount * 100), 
      currency: "INR",
      receipt: `donation_${donationId}`,
      notes: {
        donationId: donationId,
        paymentMethod: paymentMethod || "other", // Store payment method in notes
      },
    };
    
    const order = await razorpay.orders.create(options);
    
    // Update donation with payment method
    await Donation.findByIdAndUpdate(donationId, {
      razorpayOrderId: order.id,
      paymentMethod: paymentMethod || "other", // Save payment method
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



export const verifyDonationPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    
    let paymentMethod = "other";
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      paymentMethod = payment.method || "other";
      console.log("Payment method:", paymentMethod);
    } catch (error) {
      console.log("Error fetching payment details:", error);
    }

   
    const donation = await Donation.findByIdAndUpdate(
      donationId,
      {
        paymentStatus: "success",
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        paymentDate: new Date(),
        paymentMethod: paymentMethod, 
      },
      { new: true }
    );

   
    try {
      await resend.emails.send({
        from: "OBC Mahasabha <no-reply@obcmahasabha.co.in>",
        to: ["info@obcmahasabha.co.in"],
        subject: `💰 New Donation ₹${donation.amount}`,
        html: `
          <h2>New Donation Received 🎉</h2>
          <p><b>Name:</b> ${donation.name || "Anonymous"}</p>
          <p><b>Email:</b> ${donation.email || "-"}</p>
          <p><b>Mobile:</b> ${donation.mobile || "-"}</p>
          <p><b>Amount:</b> ₹${donation.amount}</p>
          <p><b>Cause:</b> ${donation.cause}</p>
          <p><b>Message:</b> ${donation.message || "-"}</p>
          <p><b>Payment Method:</b> ${getPaymentMethodDisplayName(paymentMethod)}</p>
          <p><b>Payment ID:</b> ${razorpay_payment_id}</p>
        `,
      });
      console.log("✅ Admin email sent");
    } catch (err) {
      console.log("❌ Admin email error:", err);
    }

 
    if (donation.email) {
      try {
        await resend.emails.send({
          from: "OBC Mahasabha <no-reply@obcmahasabha.co.in>",
          to: [donation.email],
          subject: "✅ दान सफल – धन्यवाद | OBC महासभा",
          html: `
            <!DOCTYPE html>
            <html lang="hi">
            <head>
              <meta charset="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
              <style>
                /* Reset */
                * { box-sizing: border-box; }
                body { margin: 0; padding: 0; background: #fdf3e7; font-family: Georgia, serif; }
                img { border: 0; display: block; }
                table { border-collapse: collapse; }
        
                /* Responsive */
                @media only screen and (max-width: 600px) {
                  .email-outer { padding: 12px 8px !important; }
                  .email-card { border-radius: 10px !important; }
                  .email-header { padding: 32px 20px 28px !important; }
                  .email-header h1 { font-size: 21px !important; }
                  .email-body { padding: 24px 18px !important; }
                  .greeting { font-size: 16px !important; }
                  .body-text { font-size: 14px !important; }
                  .card-inner { padding: 18px 16px !important; }
                  .amount-value { font-size: 18px !important; }
                  .quote-inner { padding: 20px 18px !important; }
                  .footer-inner { padding: 20px 18px !important; }
                  .divider-wrap { padding: 0 18px !important; }
                  .logo-text { font-size: 10px !important; letter-spacing: 2px !important; }
                  .checkmark-circle { width: 48px !important; height: 48px !important; font-size: 20px !important; line-height: 48px !important; }
                }
              </style>
            </head>
            <body>
              <table width="100%" cellpadding="0" cellspacing="0" class="email-outer" style="padding:30px 16px; background:#fdf3e7;">
                <tr><td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" class="email-card"
                    style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 6px 32px rgba(0,0,0,0.13); max-width:600px; width:100%;">
        
                    <!-- HEADER -->
                    <tr>
                      <td class="email-header"
                        style="background:linear-gradient(135deg,#e65c00 0%,#f9a825 50%,#2e7d32 100%); padding:44px 40px 36px; text-align:center;">
                        <p class="logo-text"
                          style="font-size:12px; letter-spacing:3.5px; color:#fff3e0; text-transform:uppercase; margin:0 0 16px; font-family:'Trebuchet MS',Arial,sans-serif;">
                          OBC महासभा
                        </p>
                        <div class="checkmark-circle"
                          style="width:60px; height:60px; background:rgba(255,255,255,0.2); border:2px solid rgba(255,255,255,0.5); border-radius:50%; margin:0 auto 18px; font-size:26px; line-height:60px; text-align:center; color:#fff;">
                          ✓
                        </div>
                        <h1 style="color:#ffffff; font-size:27px; margin:0 0 8px; font-weight:normal; font-family:Georgia,serif;">
                          दान प्राप्त हुआ 🙏
                        </h1>
                        <p style="color:#fff3e0; font-size:14px; margin:0; font-family:'Trebuchet MS',Arial,sans-serif;">
                          आपका योगदान सफलतापूर्वक प्राप्त हुआ
                        </p>
                      </td>
                    </tr>
        
                    <!-- BODY -->
                    <tr>
                      <td class="email-body" style="padding:40px; background:#fffdf9;">
        
                        <p class="greeting"
                          style="font-size:18px; color:#bf360c; margin:0 0 12px; font-family:Georgia,serif;">
                          प्रिय ${donation.name || "दाता"} जी,
                        </p>
                        <p class="body-text"
                          style="font-size:15px; color:#4e342e; line-height:1.8; margin:0 0 28px; font-family:'Trebuchet MS',Arial,sans-serif;">
                          आपके इस सहयोग के लिए हम तहे दिल से आभारी हैं। आपका योगदान हमारे समाज के निर्माण में एक महत्वपूर्ण कदम है। हर रुपये का उपयोग सार्थक तरीके से किया जाएगा।
                        </p>
        
                        <!-- DONATION CARD -->
                        <table width="100%" cellpadding="0" cellspacing="0"
                          style="background:linear-gradient(135deg,#fff8f0 0%,#f1f8e9 100%); border:2px solid #ffcc80; border-radius:12px; margin-bottom:24px;">
                          <tr><td class="card-inner" style="padding:22px 26px;">
                            <p style="font-size:11px; letter-spacing:2px; color:#e65c00; text-transform:uppercase; margin:0 0 16px; font-family:'Trebuchet MS',Arial,sans-serif;">
                              📋 दान विवरण
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding:10px 0; color:#8d6e63; font-size:13px; border-bottom:1px solid #ffe0b2; font-family:'Trebuchet MS',Arial,sans-serif; width:40%;">राशि</td>
                                <td align="right" class="amount-value"
                                  style="padding:10px 0; color:#e65c00; font-size:22px; font-family:Georgia,serif; font-weight:bold; border-bottom:1px solid #ffe0b2;">
                                  ₹${donation.amount}
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:10px 0; color:#8d6e63; font-size:13px; border-bottom:1px solid #ffe0b2; font-family:'Trebuchet MS',Arial,sans-serif;">उद्देश्य</td>
                                <td align="right"
                                  style="padding:10px 0; color:#3e2723; font-size:14px; font-weight:bold; border-bottom:1px solid #ffe0b2; font-family:'Trebuchet MS',Arial,sans-serif;">
                                  ${donation.cause}
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:10px 0; color:#8d6e63; font-size:13px; border-bottom:1px solid #ffe0b2; font-family:'Trebuchet MS',Arial,sans-serif;">तारीख</td>
                                <td align="right"
                                  style="padding:10px 0; color:#3e2723; font-size:14px; font-weight:bold; border-bottom:1px solid #ffe0b2; font-family:'Trebuchet MS',Arial,sans-serif;">
                                  ${new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:10px 0; color:#8d6e63; font-size:13px; font-family:'Trebuchet MS',Arial,sans-serif;">स्थिति</td>
                                <td align="right"
                                  style="padding:10px 0; color:#2e7d32; font-size:14px; font-weight:bold; font-family:'Trebuchet MS',Arial,sans-serif;">
                                  ✅ पुष्टि हो गई
                                </td>
                              </tr>
                            </table>
                          </td></tr>
                        </table>
        
                        <!-- QUOTE BLOCK -->
                        <table width="100%" cellpadding="0" cellspacing="0"
                          style="background:linear-gradient(135deg,#1b5e20 0%,#2e7d32 100%); border-radius:12px; margin-bottom:8px;">
                          <tr><td class="quote-inner" style="padding:24px 28px; text-align:center;">
                            <span style="font-size:38px; color:#ffcc80; font-family:Georgia,serif; line-height:1; display:block; margin-bottom:6px;">"</span>
                            <p style="color:#f1f8e9; font-size:14px; line-height:1.85; margin:0; font-family:'Trebuchet MS',Arial,sans-serif; font-style:italic;">
                              आप जैसे दानवीर ही हमारे समाज की नींव हैं।<br/>मिलकर हम एक बेहतर कल का निर्माण करेंगे।
                            </p>
                          </td></tr>
                        </table>
        
                      </td>
                    </tr>
        
                    <!-- DIVIDER -->
                    <tr>
                      <td class="divider-wrap" style="padding:0 40px;">
                        <div style="height:3px; background:linear-gradient(90deg,#e65c00,#f9a825,#2e7d32); border-radius:2px;"></div>
                      </td>
                    </tr>
        
                    <!-- FOOTER -->
                    <tr>
                      <td class="footer-inner" style="padding:26px 40px; text-align:center; background:#fff8f0;">
                        <p style="color:#e65c00; font-weight:bold; font-size:14px; letter-spacing:1px; margin:0 0 4px; font-family:'Trebuchet MS',Arial,sans-serif;">
                          🌿 OBC महासभा
                        </p>
                        <p style="color:#bcaaa4; font-size:12px; margin:4px 0; font-family:'Trebuchet MS',Arial,sans-serif;">
                          no-reply@obcmahasabha.co.in
                        </p>
                        <p style="color:#d7ccc8; font-size:11px; margin:10px 0 0; font-family:'Trebuchet MS',Arial,sans-serif;">
                          यह एक स्वचालित ईमेल है। कृपया उत्तर न दें।
                        </p>
                      </td>
                    </tr>
        
                  </table>
                </td></tr>
              </table>
            </body>
            </html>
          `,
        });
        console.log("✅ Donor email sent with payment method");
      } catch (err) {
        console.log("❌ Donor email error:", err);
      }
    }

    res.json({
      success: true,
      message: "Payment verified & emails sent",
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


function getPaymentMethodDisplayName(method) {
  const methodMap = {
    'card': 'क्रेडिट/डेबिट कार्ड',
    'upi': 'UPI',
    'netbanking': 'नेट बैंकिंग',
    'wallet': 'वॉलेट',
    'other': 'अन्य'
  };
  return methodMap[method] || method;
}