const { PrismaClient } = require("@prisma/client");
const { default: axios } = require("axios");
const fetchDKPData = require("../../../utils/fetchDKPData");
const prisma = new PrismaClient();

const DigikalaController = {
  async GetOne(req, res) {
    const { dkp } = req.params;

    if (!dkp) {
      return res.status(400).json({ error: "dkp is required" });
    }

    const response = await fetchDKPData(dkp);

    return res.json(response);
  },
};

module.exports = DigikalaController;
