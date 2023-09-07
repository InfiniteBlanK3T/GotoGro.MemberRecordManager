const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500: res.statusCode;

  if (req.timedout) {
    statusCode = 408;
  }

  switch (statusCode) {
    case constants.REQUEST_TIMEOUT:
      res.json({
        title: "REQUEST TIMEOUT",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZE:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error");
      break;
  }
};

module.exports = errorHandler;
