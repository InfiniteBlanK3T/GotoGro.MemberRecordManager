const express = require("express");
const router = express.Router();

const {
	getAllSales,
	getSale,
	createSale,
	updateSale,
	deleteSale,
	searchSales,
} = require("../controllers/saleController");
const {
	validateToken,
	requirePermission,
} = require("../middleware/validateToken");

router.use(validateToken);

router.get("/", requirePermission("EditSales"), getAllSales);
router.post("/", requirePermission("AddSales"), createSale);

router
	.route("/search")
	.get("/search", requirePermission("EditSales"), searchSales);

router
	.route("/:id")
	.get(requirePermission("EditSales"), getSale)
	.put(requirePermission("EditSales"), updateSale)
	.delete(requirePermission("EditSales"), deleteSale);

module.exports = router;
