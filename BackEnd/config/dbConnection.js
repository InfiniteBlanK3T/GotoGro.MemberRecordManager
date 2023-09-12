const Sequelize = require("sequelize");
require("dotenv").config();
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
		logging: false,
	}
);

const connectDatabase = async () => {
	let retries = 0;

	while (retries < MAX_RETRIES) {
		try {
			await sequelize.authenticate();
			console.log("Database connection has been established successfully.");
			return;
		} catch (err) {
			retries++;
			console.error(
				`Unable to connect to the database. Attempt ${retries} of ${MAX_RETRIES}.`,
				err
			);

			if (retries < MAX_RETRIES) {
				await new Promise((res) => setTimeout(res, RETRY_DELAY));
			} else {
				console.error("Max retries reached. Exiting...");
				throw err;
			}
		}
	}
};

module.exports = {
	sequelize,
	connectDatabase,
};
