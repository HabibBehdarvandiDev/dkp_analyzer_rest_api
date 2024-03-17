const fetchDKPData = require("../../../utils/fetchDKPData");

const ExtractData = {
  async ExtractFromDkp(req, res) {
    try {
      const { dkp } = req.params;

      if (!dkp) {
        return res.status(400).json({ error: "آیدی کالا باید فرستاده شود." });
      }

      const ProductData = await fetchDKPData(parseInt(dkp));

      return res.status(200).json(ProductData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  },
};

module.exports = ExtractData;
