const bcrypt = require("bcrypt");
const LogInModel = require("../models/LogInModel");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AuthController = {
  async LogIn(req, res) {
    try {
      const body = req.body;

      const validation = LogInModel.safeParse(body);

      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }

      const { username, password } = validation.data;

      const isUserExist = await prisma.users.findUnique({
        where: { username: username },
      });

      if (!isUserExist) {
        return res.status(404).json({ error: "User not found" });
      }
      const isPasswordMatch = await bcrypt.compare(
        password,
        isUserExist.password
      );

      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      const secretKey = process.env.JWT_SECRET_KEY;

      const payload = {
        id: isUserExist.id,
        username: isUserExist.username,
        role: isUserExist.role,
        first_name: isUserExist.first_name,
        last_name: isUserExist.last_name,
        nickname: isUserExist.nickname,
      };

      const authToken = jwt.sign(payload, secretKey);

      

      return res.json(authToken);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  },
};

module.exports = AuthController;
