const express = require("express");
const DkpController = require("../controllers/DkpController");

const router = express.Router();

router.post("/api/v1/dkp", DkpController.CreateOne);
router.get("/api/v1/dkp", DkpController.GetAll);
router.get("/api/v1/dkp/:dkp", DkpController.GetOne);
router.patch("/api/v1/dkp/:dkp", DkpController.UpdateOne);
router.delete("/api/v1/dkp/:dkp", DkpController.DeleteOne);

module.exports = router;
