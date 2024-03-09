const DkpModel = require("../models/DkpModel");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DkpController = {
  async CreateOne(req, res) {
    try {
      const body = req.body;

      const validation = DkpModel.safeParse(body);

      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }

      const { product_dkp, product_title, product_price, product_status } =
        body;

      const isDkpExist = await prisma.product_dkp.findUnique({
        where: {
          product_dkp: product_dkp,
        },
      });

      if (isDkpExist) {
        return res
          .status(400)
          .json({ error: "کالا با آیدی فرستاده شده قبلا ثبت شده است" });
      }

      const newProduct = await prisma.product_dkp.create({
        data: {
          product_dkp: product_dkp,
          product_title: product_title,
          product_price: product_price,
          product_status: product_status,
        },
      });

      return res.status(200).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  },
  async GetAll(req, res) {
    const product_dkp_arr = await prisma.product_dkp.findMany();
    return res.status(200).json(product_dkp_arr);
  },
  async GetOne(req, res) {
    try {
      const { dkp } = req.params;

      if (!dkp) {
        return res.status(400).json({ error: "آیدی کالا الزامی است" });
      }

      const product = await prisma.product_dkp.findFirst({
        where: {
          product_dkp: parseInt(dkp),
        },
      });

      if (!product) {
        return res.status(404).json({ error: "کالا پیدا نشد" });
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Internal server Error" });
    }
  },
  async UpdateOne(req, res) {
    try {
      const { dkp } = req.params;
      const { body } = req;

      if (!dkp) {
        return res.status(400).json({ error: "آیدی کالا الزامی است." });
      }

      const existingProduct = await prisma.product_dkp.findFirst({
        where: {
          product_dkp: parseInt(dkp),
        },
      });

      if (!existingProduct) {
        return res.status(404).json({ error: "کالا پیدا نشد." });
      }

      // Validate only the provided fields
      const validation = DkpModel.partial().safeParse(body);

      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }

      const { product_dkp, product_title, product_price, product_status } =
        validation.data;

      const payload = {
        product_dkp: product_dkp ? product_dkp : undefined,
        product_title: product_title ? product_title : undefined,
        product_price: product_price ? product_price : undefined,
        product_status: product_status ? product_status : undefined,
      };

      // Update only the provided fields
      const updatedProduct = await prisma.product_dkp.update({
        where: { product_dkp: parseInt(dkp) },
        data: payload,
      });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  },
  async DeleteOne(req, res) {
    try {
      const { dkp } = req.params;

      if (!dkp) {
        return res.status(400).json({ error: "DKP is Required !" });
      }

      const existingDkp = await prisma.product_dkp.findFirst({
        where: {
          product_dkp: parseInt(dkp),
        },
      });

      if (!existingDkp) {
        return res.status(404).json({ error: "Product was Not Found !" });
      }

      const deletedDkp = await prisma.product_dkp.delete({
        where: {
          product_dkp: parseInt(dkp),
        },
      });

      return res.status(200).json(deletedDkp);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  },
};

module.exports = DkpController;
