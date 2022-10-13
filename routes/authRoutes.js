const express = require("express");
const authController = require("../Controller/authController");
const authRoute = express.Router();


authRoute.post("/signUp", authController.registerUser);
authRoute.post('/signIn', authController.loginUser);
authRoute.get("/logout", authController.logoutUser);

module.exports = authRoute;