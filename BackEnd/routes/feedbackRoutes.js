const express = require("express");
const router = express.Router();

const {
	getAllFeedback,
	getFeedback,
	createFeedback,
	updateFeedback,
	deleteFeedback,
} = require("../controllers/feebackController");
const {
	validateToken,
	requirePermission,
} = require("../middleware/validateToken");

router.use(validateToken);

router.get("/", requirePermission("AddFeebacks"), getAllFeedback);

router.post("/", requirePermission("AddFeebacks"), createFeedback);

router
	.route("/:id")
	.get(requirePermission("AddFeebacks"), getFeedback)
	.put(requirePermission("AddFeebacks"), updateFeedback)
	.delete(requirePermission("AddFeebacks"), deleteFeedback);

module.exports = router;
