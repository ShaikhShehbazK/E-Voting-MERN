const Voter = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");

exports.postSignup = [
  //First Name validation
  check("name")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters"),

  check("age")
    .notEmpty()
    .withMessage("age is required")
    .isInt({ min: 18 })
    .withMessage("You must be at least 18 years old to register"),

  //Email validation
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  //Password validation
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long")
    .matches(/[a-z]/)
    .withMessage("Password must be at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must be at least one uppercase letter")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  //Confirm Password validation
  // check("confirm_password")
  //   .trim()
  //   .custom((value, { req }) => {
  //     if (value !== req.body.password) {
  //       throw new Error("Password do not match");
  //     }
  //     return true;
  //   }),

  // User Type validation
  // check("userType")
  //   .notEmpty()
  //   .withMessage("User type is required")
  //   .isIn(["voter", "admin"])
  //   .withMessage("Invalide user type"),
  async (req, res) => {
    try {
      const userData = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // const hashedPassword = await bcrypt.hash(password, 12);
      const user = new Voter(userData);
      // console.log(user);

      //check if there is already an admin user
      const adminUser = await Voter.findOne({ role: "admin" });
      if (user.role === "admin" && adminUser) {
        return res.status(403).json({ message: "Multiple admin not allowed" });
      }

      const response = await user.save();

      res.status(200).json({ response: response });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          message: "A user with this email or AdhaarNum already exists.",
        });
      }
      console.log("Error while creating user: ", err);
    }
  },
];

exports.postLogin = async (req, res, next) => {
  const adhaarCardNumber = req.body.adhaarCardNumber;
  const password = req.body.password;
  try {
    const voter = await Voter.findOne({ adhaarCardNumber });

    if (!voter) {
      req.session.destroy(() => {});
      return res
        .status(404)
        .json({ message: "User is not found or incorrect adhaar card number" });
    }

    const isMatch = await bcrypt.compare(password, voter.password);

    if (!isMatch) {
      req.session.destroy(() => {});
      return res.status(404).json({ message: "Incorrect Password" });
    }

    // req.session.voter = voter;
    req.session.voter = voter;
    await req.session.save();

    res.status(200).json({ message: "login successfully" });
  } catch (err) {
    console.log("Error while logging in : ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postLogout = (req, res, next) => {
  console.log("in Logout", req.session.voter);
  if (req.session.voter) {
    req.session.destroy((err) => {
      if (err) {
        req.session.destroy(() => {});
        return res.status(500).json({ error: "Failed to logout" });
      } else {
        return res.status(200).json("logout successfully");
      }
    });
  } else {
    req.session.destroy(() => {});
    return res.status(400).json({ error: "No session is found" });
  }
};

//Check isloggin state from session
exports.getUser = (req, res) => {
  if (req.session.voter) {
    res.status(200).json({ voter: req.session.voter });
  } else {
    req.session.destroy(() => {});
    res.status(401).json("Not authenticated");
  }
};
