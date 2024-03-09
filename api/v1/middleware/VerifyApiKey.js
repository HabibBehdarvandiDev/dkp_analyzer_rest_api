const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const VerifyApiKey = async (req, res, next) => {
  const apiKey = req.headers["api-key"];
  if (!apiKey) {
    return res.status(401).json({ error: "Unauthorized | Api-Key missing !" });
  }
  const isKeyValid = await prisma.apiKey.findUnique({
    where: {
      api_key: apiKey,
    },
  });

  if (!isKeyValid) {
    return res.status(401).json({ error: "Unauthorized | Api-Key Invalid !" });
  }

  next();
};

module.exports = VerifyApiKey;
