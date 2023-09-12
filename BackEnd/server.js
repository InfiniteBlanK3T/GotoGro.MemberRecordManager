const express = require("express");
const dotenv = require("dotenv").config();
const { connectDatabase } = require("./config/dbConnection");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const port = process.env.PORT || 5732;

app.use(express.json());

//FrontEnd Connection
app.use(
	cors({
		origin: process.env.FRONTEND_DOMAIN,
	})
);

// APIs Routing
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/member", require("./routes/memberRoutes"));
app.use("/api/sale", require("./routes/saleRoutes"));
app.use("/api/item", require("./routes/itemRoutes"));
app.use("/api/permission", require("./routes/permissionRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));

connectDatabase()
	.then(() => {
		const server = app.listen(port, () => {
			console.log(`Port running: ${port}`);
		});
		server.timeout = 30000;

		//Graceful Shutdown - Important DO NOT delete - data persistent
		process.on("SIGTERM", () => {
			console.log("SIGTERM received. Shutting down gracefully.");
			server.close(() => {
				console.log("Server closed.");
			});
		});
	})
	.catch((err) => {
		console.error("Failed to connect to the database. Exiting...", err);
		process.exit(1); // Exit the process with a failure code
	});

app.use(errorHandler);
