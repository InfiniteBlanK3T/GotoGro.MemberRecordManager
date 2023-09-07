const express = require("express");
const router = express.Router();

const {
  getAllFeedback,
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feebackController");

router.route("/").get(getAllFeedback).post(createFeedback);

router
  .route("/:id")
  .get(getFeedback)
  .put(updateFeedback)
  .delete(deleteFeedback);

module.exports = router;
