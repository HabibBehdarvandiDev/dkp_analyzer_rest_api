const express = require("express");
const UserRoutes = require("./api/v1/routes/userRoutes");
const DkpRoutes = require("./api/v1/routes/DkpRoutes");
const AuthRoutes = require("./api/v1/routes/AuthRoutes");

const app = express();

app.use(express.json());

app.get("/rest/api", (req, res) => {
  res.send("Hello World!");
});

// Include user routes
app.use(UserRoutes);

app.use(DkpRoutes);

app.use(AuthRoutes);

const port = process.env.SERVER_PORT || 3333;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
