const express = require("express");
const ExtractData = require("../controllers/ExtractDataController");

const router = express.Router();

router.get("/api/v1/:dkp", ExtractData.ExtractFromDkp);

module.exports = router;
