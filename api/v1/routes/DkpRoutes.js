const express = require("express");
const DkpController = require("../controllers/DkpController");
const VerifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/api/v1/dkp", VerifyToken, DkpController.CreateOne);
router.get("/api/v1/dkp", VerifyToken, DkpController.GetAll);
router.get("/api/v1/dkp/:dkp", VerifyToken, DkpController.GetOne);
router.patch("/api/v1/dkp/:dkp", VerifyToken, DkpController.UpdateOne);
router.delete("/api/v1/dkp/:dkp", VerifyToken, DkpController.DeleteOne);

module.exports = router;
