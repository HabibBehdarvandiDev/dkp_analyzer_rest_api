const z = require("zod");
const UserRoles = require("@prisma/client");

const DkpModel = z.object({
  product_dkp: z.number(),
  product_title: z.string(),
  product_price: z.string(),
  product_status: z.enum(["out_of_stock", "marketable"]),
});

module.exports = DkpModel;
