const asyncHandler = require("express-async-handler");
const Permissions = require("../models/permissionModel");
const Sequelize = require("sequelize");

//---------------API---------------
//@access public
//@ route GET /api/permissions/
const getAllPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permissions.findAll();
  res.status(200).json({ permissions });
});

//@access public
//@ route GET /api/permissions/:id
const getPermission = asyncHandler(async (req, res) => {
  const permission = await Permissions.findByPk(req.params.id);
  if (!permission) {
    res.status(404);
    throw new Error(
      `Permission with EmployeeId: \`${req.params.id}\` not found`
    );
  }

  res.status(200).json(permission);
});

//@access public
//@ route PUT /api/permissions/:id
const updatePermission = asyncHandler(async (req, res) => {
  let permission = await Permissions.findByPk(req.params.id);
  if (!permission) {
    res.status(404);
    throw new Error(
      `Permission with EmployeeId: \`${req.params.id}\` not found`
    );
  }

  permission = await permission.update(req.body);
  res.status(200).json(permission);
});

//@access public
//@ route POST /api/permissions/
const createPermission = asyncHandler(async (req, res) => {
  const { EmployeeId, Level, UserName, Password } = req.body;

  try {
    const permission = await Permissions.create({
      EmployeeId,
      Level,
      UserName,
      Password,
    });

    res.status(201).json(permission);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    throw error;
  }
});

//@access public
//@ route DELETE /api/permissions/:id
const deletePermission = asyncHandler(async (req, res) => {
  const permission = await Permissions.findByPk(req.params.id);

  if (!permission) {
    res.status(404);
    throw new Error(
      `Permission with EmployeeId: \`${req.params.id}\` not found`
    );
  }

  await permission.destroy();
  res.status(200).json(permission);
});

module.exports = {
  getAllPermissions,
  getPermission,
  updatePermission,
  createPermission,
  deletePermission,
};
