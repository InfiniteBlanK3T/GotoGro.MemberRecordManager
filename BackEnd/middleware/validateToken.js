const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const RolePermissionMapping = require("../models/rolePermissionMappingModel");
const Permission = require("../models/permissionModel");
const Role = require("../models/roleModel");

const validateToken = asyncHandler(async (req, res, next) => {
	let token;
	let authHeader = req.headers.authorization || req.headers.Authorization;

	if (authHeader && authHeader.startsWith("Bearer")) {
		token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				res.status(401);
				throw new Error("User is not authorized");
			}
			req.user = decoded.user;
			next();
		});

		if (!token) {
			res.status(401);
			throw new Error("User is not authorized or Token is missing");
		}
	}
});

const requirePermission = (requiredPermission) => {
	return async (req, res, next) => {
		const userRoleName = req.user.Role;
		const role = await Role.findOne({
			where: { Name: userRoleName },
		});

		if (!role) {
			return res.status(403).json({ error: "Role not found" });
		}

		const userRoleId = role.RoleId;

		const rolePermissionMappings = await RolePermissionMapping.findAll({
			where: { RoleId: userRoleId },
			attributes: ["PermissionId"],
		});

		const permissionIds = rolePermissionMappings.map(
			(mapping) => mapping.PermissionId
		);

		const permissions = await Permission.findAll({
			where: { PermissionId: permissionIds },
		});

		const permissionNames = permissions.map((permission) => permission.Name);

		if (permissionNames.includes(requiredPermission)) {
			next();
		} else {
			res.status(403).json({ error: "Forbidden" });
		}
	};
};

module.exports = { validateToken, requirePermission };
