const express = require("express");
const dotenv = require("dotenv").config();
const sequelize = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 5732;

app.use(express.json());

app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/member", require("./routes/memberRoutes"));
// app.use("/api/sales", require("./routes/saleRoutes"));
// app.use("/api/item", require("./routes/itemRoutes"));
app.use("/api/permission", require("./routes/permissionRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));

app.use(errorHandler);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    const server = app.listen(port, () => {
      console.log(`Port running: ${port}`);
    });
    server.timeout = 30000;
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
