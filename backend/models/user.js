const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
    require: true,
  },
  adhaarCardNumber: {
    type: Number,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

voterSchema.pre("save", async function (next) {
  const voter = this;

  //if password is modified or saved as first time then only hashed it
  if (!voter.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(voter.password, 12);
    voter.password = hashedPassword;
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = mongoose.model("Voter", voterSchema);
