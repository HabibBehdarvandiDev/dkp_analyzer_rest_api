const express = require("express");
const cors = require("cors");
const UserRoutes = require("./api/v1/routes/userRoutes");
const DkpRoutes = require("./api/v1/routes/DkpRoutes");
const AuthRoutes = require("./api/v1/routes/AuthRoutes");
const DigikalaRoutes = require("./api/v1/routes/DigikalaRoutes");
const VerifyApiKey = require("./api/v1/middleware/VerifyApiKey");
const { scheduleProductUpdate } = require("./utils/productUpdater");

const app = express();

app.use(cors());
app.use(express.json());
app.use(VerifyApiKey);

scheduleProductUpdate();

app.get("/rest/api", (req, res) => {
  res.send("Hello World!");
});

// Include user routes
app.use(UserRoutes);

app.use(DkpRoutes);

app.use(AuthRoutes);

app.use(DigikalaRoutes);

const port = process.env.SERVER_PORT || 3333;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
