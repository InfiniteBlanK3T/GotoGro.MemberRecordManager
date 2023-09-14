const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	if (req.timedout) {
		statusCode = 408;
	}

	let title = "";

	switch (statusCode) {
		case constants.REQUEST_TIMEOUT:
			title = "Request Timeout";
			break;
		case constants.VALIDATION_ERROR:
			title = "Validation Failed";
			break;
		case constants.NOT_FOUND:
			title = "Not Found";
			break;
		case constants.FORBIDDEN:
			title = "Forbidden";
			break;
		case constants.UNAUTHORIZE:
			title = "Unauthorized";
			break;
		case constants.SERVER_ERROR:
			title = "Server Error";
			break;
		default:
			title = "Unknown Error";
			break;
	}

	res.status(statusCode).json({
		title: title,
		message: err.message,
		stackTrace: err.stack,
	});
	console.error("Error:", err);
};

module.exports = errorHandler;

module.exports = errorHandler;
