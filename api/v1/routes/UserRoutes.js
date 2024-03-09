const express = require("express");
const UserController = require("../controllers/UserController");


const router = express.Router();

router.post("/api/v1/users", UserController.CreateOne);

router.get("/api/v1/users", UserController.GetAll);

router.get("/api/v1/users/:id", UserController.GetOne);
router.patch("/api/v1/users/:id", UserController.UpdateOne);
router.delete("/api/v1/users/:id", UserController.DeleteOne);

module.exports = router;
