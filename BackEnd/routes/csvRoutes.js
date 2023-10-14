const express = require("express");
const router = express.Router();

const {
	downloadMembersCSV,
	downloadSalesCSV,
	downloadFeedbackCSV,
} = require("../controllers/csvController");
const {
	requirePermission,
	validateToken,
} = require("../middleware/validateToken");

router.use(validateToken);
router.get("/", requirePermission("DownloadCSV"), downloadMembersCSV);

router.get("/csvSales", requirePermission("DownloadCSV"), downloadSalesCSV);

router.get(
	"/csvFeedback",
	requirePermission("DownloadCSV"),
	downloadFeedbackCSV
);

module.exports = router;
