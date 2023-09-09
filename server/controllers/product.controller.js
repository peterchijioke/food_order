const expressAsyncHandler = require("express-async-handler");
const emailStructure = require("../helper/emailStructure");
const sendEmail = require("../helper/sendEmail");
const { Vonage } = require("@vonage/server-sdk");
const apiKey = process.env.VONAGE_API_KEY;
const apiSecret = process.env.VONAGE_SECRETE;

const vonage = new Vonage({
  apiKey,
  apiSecret,
});

const from = "Vonage APIs";
const to = "2347038620466";
const text = "A text message sent using the Vonage SMS API";

async function sendSMS() {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
}

const orderProduct = expressAsyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(403);
    throw new Error("Please provide a valid product");
  }

  try {
    const emailSent = await sendEmail(emailStructure(req, { name, price }));

    // ===================== SMS ==============================
    sendSMS();
    // ============================= SMS ==========================

    if (emailSent) {
      res.status(200).json({
        status: true,
        message: "Product Ordered Successful",
      });
    }
    res.status(403).json({
      status: false,
      message: "Unexpected Error occurred",
    });
  } catch (error) {
    console.log(error.message);
  }

  res.status(200).json({
    name,
    price,
  });
});
module.exports = {
  orderProduct,
};
