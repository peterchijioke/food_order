const Mailgun = require("mailgun.js");
const { response } = require("express");
const formData = require("form-data");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

console.log(process.env.MAILGUN_API_KEY);
const emailVerify = async (data) => {
  try {
    const data1 = await mg.messages.create(process.env.MAILGUN_URL, data);
    if (data1.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    response.status(403);
    throw new Error("Error: Email not sent");
  }
};

module.exports = emailVerify;
