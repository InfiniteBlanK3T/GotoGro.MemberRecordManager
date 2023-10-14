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
			console.log(
				`\x1b[32mDatabase Connection has been established successfully!\x1b[0m`
			);
			return;
		} catch (err) {
			retries++;
			console.error(
				`\x1b[31mUnable to connect to the Database. Attempt ${retries} of ${MAX_RETRIES}.\x1b[0m`
			);

			if (retries < MAX_RETRIES) {
				await new Promise((res) => setTimeout(res, RETRY_DELAY));
			} else {
				console.error(`\x1b[33mMax retries reached. Exiting...\x1b[0m`);
			}
		}
	}
};

module.exports = {
	sequelize,
	connectDatabase,
};
