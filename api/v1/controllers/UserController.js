const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserController = {
  async CreateOne(req, res) {
    try {
      const body = req.body;

      const validation = UserModel.safeParse(body);

      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }

      const {
        first_name,
        last_name,
        username,
        password,
        phone_number,
        role,
        actions,
        nickname,
      } = body;

      const isUsernameUnique = await prisma.users.findUnique({
        where: {
          username: username,
        },
      });

      if (isUsernameUnique) {
        return res
          .status(400)
          .json({ error: "این نام کاربری قبلا انتخاب شده است." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const payload = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: hashedPassword,
        phone_number: phone_number ? phone_number : undefined,
        role: role ? role : undefined,
        actions: actions ? actions : undefined,
        nickname: nickname ? nickname : undefined,
      };

      const newUser = await prisma.users.create({
        data: payload,
      });

      return res.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  },
  async GetAll(req, res) {
    const users = await prisma.users.findMany();
    return res.status(200).json(users);
  },
  async GetOne(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "آیدی کاربر را نفرستادید." });
      }

      const user = await prisma.users.findFirst({
        where: {
          id: parseInt(id),
        },
      });

      if (!user) {
        return res.status(404).json({ error: "کاربر پیدا نشد." });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server Error" });
    }
  },
  async UpdateOne(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      if (!id) {
        return res.status(400).json({ error: "آیدی کاربر را نفرستادید." });
      }

      const existingUser = await prisma.users.findFirst({
        where: {
          id: parseInt(id),
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "کاربر پیدا نشد." });
      }

      // Validate only the provided fields
      const validation = UserModel.partial().safeParse(body);

      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }

      const {
        first_name,
        last_name,
        username,
        password,
        phone_number,
        role,
        actions,
        nickname,
      } = validation.data;

      const payload = {
        first_name: first_name ? first_name : undefined,
        last_name: last_name ? last_name : undefined,
        username: username ? username : undefined,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        phone_number: phone_number ? phone_number : undefined,
        role: role ? role : undefined,
        actions: actions ? actions : undefined,
        nickname: nickname ? nickname : undefined,
      };

      // Update only the provided fields
      const updatedUser = await prisma.users.update({
        where: { id: parseInt(id) },
        data: payload,
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  },
  async DeleteOne(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "آیدی کاربر الزامی است" });
      }

      const existingUser = await prisma.users.findFirst({
        where: {
          id: parseInt(id),
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "کاربر پیدا نشد." });
      }

      const deletedUser = await prisma.users.delete({
        where: {
          id: parseInt(id),
        },
      });

      return res.status(200).json(deletedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  },
};

module.exports = UserController;
