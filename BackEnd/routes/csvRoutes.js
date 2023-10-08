
const express = require("express");
const router = express.Router();

const {
    downloadMembersCSV
} =  require("../controllers/csvController");

router.route("/").get(downloadMembersCSV)

module.exports = router;