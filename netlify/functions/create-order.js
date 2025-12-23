const Razorpay = require("razorpay");

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // INR in paise
      currency: "INR",
      receipt: "order_rcptid_11",
    });

    return {
      statusCode: 200,
      body: JSON.stringify(order),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
