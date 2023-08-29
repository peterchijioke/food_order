const { Schema, model } = require("mongoose");

const User = Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: [true, "Email already exists"],
  },
  phone: {
    type: Schema.Types.String,
    required: true,
    unique: [true, "Phone already exists"],
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

module.exports = model("User", User);
