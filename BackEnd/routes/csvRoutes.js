
const express = require("express");
const router = express.Router();

const {
    downloadMembersCSV,
    downloadSalesCSV
} =  require("../controllers/csvController");

router.route("/").get(downloadMembersCSV);

router.route("/csvSales").get(downloadSalesCSV);

module.exports = router;