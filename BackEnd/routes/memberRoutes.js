const express = require("express");
const router = express.Router();

const {
  getAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

router.route("/").get(getAllMembers).post(createMember);

router.route("/:id").get(getMember).put(updateMember).delete(deleteMember);

module.exports = router;
