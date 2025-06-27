const Voter = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getProfile = (req, res, next) => {
  const userData = req.session.voter;
  res.status(200).json({ userData });
};

exports.postPassword = async (req, res, next) => {
  try {
    const userId = req.session.voter._id;
    const { currentPassword, newPassword } = req.body;
    console.log("in backend", currentPassword, newPassword);
    const voter = await Voter.findById(userId);

    const isMatch = await bcrypt.compare(currentPassword, voter.password);
    if (!isMatch) {
      return res.status(400).json({ message: "You entered wrong password" });
    }

    voter.password = newPassword;
    voter.save();
    res.status(200).json({ message: "password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
