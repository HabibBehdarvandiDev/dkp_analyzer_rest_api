const express = require("express");
const UserController = require("../controllers/UserController");
const VerifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/api/v1/users", VerifyToken, UserController.CreateOne);

router.get("/api/v1/users", VerifyToken, UserController.GetAll);

router.get("/api/v1/users/:id", VerifyToken, UserController.GetOne);
router.patch("/api/v1/users/:id", VerifyToken, UserController.UpdateOne);
router.delete("/api/v1/users/:id", VerifyToken, UserController.DeleteOne);

module.exports = router;
