const express = require("express");

const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post("/api/v1/auth/login", AuthController.LogIn);

module.exports = router;
