// import Razorpay from "razorpay";

// export default async function handler(req, res) {

//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });

//     const options = {
//       amount: 200 * 100, // ₹200
//       currency: "INR",
//       receipt: "membership_receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);

//     return res.status(200).json({
//       success: true,
//       order: order,
//     });

//   } catch (error) {

//     console.error("Razorpay Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Order creation failed",
//     });

//   }
// }



import Razorpay from "razorpay";

export default async function handler(req, res) {

  const razorpay = new Razorpay({
    key_id: "rzp_test_SPQyvTnLfHY93U",
    key_secret: "QvdBWa0UEhArIHycvWdKDTFF"
  });

  const order = await razorpay.orders.create({
    amount: 200 * 100,
    currency: "INR"
  });

  res.status(200).json({ order });
}