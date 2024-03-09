const express = require("express");
const DigikalaController = require("../controllers/DigikalaController");

const router = express.Router();

/* router.get("/api/v1/digikala", VerifyToken, DigikalaController.GetOne);*/

router.get("/api/v1/digikala/:dkp", DigikalaController.GetOne);

module.exports = router;
