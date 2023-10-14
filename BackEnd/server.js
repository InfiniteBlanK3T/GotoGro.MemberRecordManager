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
//Removing Employee since not needed
//app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/member", require("./routes/memberRoutes"));
app.use("/api/sale", require("./routes/saleRoutes"));
app.use("/api/item", require("./routes/itemRoutes"));
app.use("/api/permission", require("./routes/permissionRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/csv", require("./routes/csvRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

connectDatabase()
	.then(() => {
		const server = app.listen(port, () => {
			console.log(`Backend Server running on Port: ${port}`);
		});
		server.timeout = 30000;

		//Graceful Shutdown - Important DO NOT delete - data persistent
		process.on("SIGTERM", () => {
			console.log(`\x1b[32mSIGTERM received. Shutting down gracefully.\x1b[0m`);
			server.close(() => {
				console.log(`\x1b[32mServer closed.\x1b[0m`);
			});
		});
	})
	.catch((err) => {
		console.error(
			`\x1b[32mFailed to connect to the database. Exiting...\x1b[0m`,
			err
		);
		process.exit(1); // Exit the process with a failure code
	});

app.use(errorHandler);
