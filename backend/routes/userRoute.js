//External Module
const express = require("express");
const userRouter = express.Router();
const Voter = require("../models/user");
const bcrypt = require("bcryptjs");
const userController = require("../controllers/userController");

userRouter.get("/profile", userController.getProfile);

userRouter.post("/profile/password", userController.postPassword);

module.exports = userRouter;
