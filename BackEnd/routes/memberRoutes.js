const express = require("express");
const router = express.Router();

const {
	getAllMembers,
	getMember,
	createMember,
	updateMember,
	deleteMember,
	searchMembers,
} = require("../controllers/memberController");

const {
	validateToken,
	requirePermission,
} = require("../middleware/validateToken");

router.use(validateToken);

router.post("/", createMember);

router.get("/search", requirePermission("EditMember"), searchMembers);

router.get("/", requirePermission("EditMember"), getAllMembers);

router
	.route("/:id")
	.get(requirePermission("EditMember"), getMember)
	.put(requirePermission("EditMember"), updateMember)
	.delete(requirePermission("EditMember"), deleteMember);

module.exports = router;
