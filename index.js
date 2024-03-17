const express = require("express");
const cors = require("cors");
const ExtractDataRoutes = require("./api/v1/routes/ExtractDataRoutes");
const VerifyApiKey = require("./api/v1/middleware/VerifyApiKey");

const app = express();

app.use(cors());
app.use(express.json());
app.use(VerifyApiKey);

// Include user routes
app.use(ExtractDataRoutes);

const port = process.env.SERVER_PORT || 3333;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
