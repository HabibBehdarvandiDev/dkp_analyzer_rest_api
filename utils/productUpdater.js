const cron = require("node-cron");
const fetchDKPData = require("./fetchDKPData"); // Import your fetchDKPData function

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// This function updates products every hour
const updateProducts = async () => {
  const products = await prisma.product_dkp.findMany();

  const dkpArray = products.map((product) => {
    return product.product_dkp;
  });

  dkpArray.map(async (dkp) => {
    const updatedProductData = await fetchDKPData(dkp);
    const updatedProduct = await prisma.product.upsert({
      where: { product_dkp: dkp },
      update: updatedProductData,
      create: updatedProductData,
    });
  });
};

const scheduleProductUpdate = () => {
  cron.schedule("0 * * * *", async () => {
    await updateProducts();
  });
};

module.exports = { scheduleProductUpdate };
