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

router.route("/").get(getAllSales).post(createSale);

router.route("/search").get(searchSales);

router.route("/:id").get(getSale).put(updateSale).delete(deleteSale);

module.exports = router;
