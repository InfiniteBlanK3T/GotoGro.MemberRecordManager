const express = require("express");
const router = express.Router();

const {
  getAllPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController");
router.route("/").get(getAllPermissions).post(createPermission);

router
  .route("/:id")
  .get(getPermission)
  .put(updatePermission)
  .delete(deletePermission);

module.exports = router;
