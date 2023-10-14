const express = require("express");
const router = express.Router();

const {
	getAllItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require("../controllers/itemController");

router.route("/").get(getAllItems).post(createItem);

router.route("/:id").get(getItem).put(updateItem).delete(deleteItem);

module.exports = router;
