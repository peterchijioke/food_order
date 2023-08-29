const expressAsyncHandler = require("express-async-handler");
const emailStructure = require("../helper/emailStructure");
const sendEmail = require("../helper/sendEmail");
const orderProduct = expressAsyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(403);
    throw new Error("Please provide a valid product");
  }

  try {
    const emailSent = await sendEmail(emailStructure(req, { name, price }));

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
