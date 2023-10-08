
const express = require("express");
const router = express.Router();

const {
    downloadMembersCSV,
    downloadSalesCSV,
    downloadFeedbackCSV
} =  require("../controllers/csvController");

router.route("/").get(downloadMembersCSV);

router.route("/csvSales").get(downloadSalesCSV);

router.route("/csvFeedback").get(downloadFeedbackCSV);

module.exports = router;