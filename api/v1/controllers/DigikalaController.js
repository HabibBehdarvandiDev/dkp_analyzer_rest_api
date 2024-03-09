const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const DigikalaController = {
  async GetOne(req, res) {
    const { dkp } = req.params;

    if (!dkp) {
      return res.status(400).json({ error: "dkp is required" });
    }

    const product = await prisma.product.findUnique({
      where: {
        product_dkp: parseInt(dkp),
      },
    });

    if (!product) {
      return res.json({ error: "product Not Found" });
    }

    return res.json(product);
  },
  async GetAll(req, res) {
    const products = await prisma.product.findMany();
    return res.json(products);
  },
};

module.exports = DigikalaController;
