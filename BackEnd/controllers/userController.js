const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Member = require("../models/memberModel");
const Role = require("../models/roleModel");

//@desc Register a user
//@route POST /api/user/register
//@access private
const registerUser = asyncHandler(async (req, res, next) => {
	const { MemberId, Password, RoleId } = req.body;

	if (req.body.Username || !MemberId || !Password || !RoleId) {
		return res.status(400).json({ error: "Invalid input fields" });
	}

	const existingUser = await User.findOne({ where: { MemberId } });
	if (existingUser) {
		return res.status(400).json({ error: "User already registered!" });
	}

	const member = await Member.findOne({ where: { MemberId } });
	if (!member) {
		return res.status(400).json({ error: "Member not found!" });
	}

	const usernameBase = `${member.FirstName[0]}${member.LastName.slice(
		0,
		1
	)}`.toUpperCase();
	let username = `${usernameBase}0000`;
	let userCount = 0;

	while (await User.findOne({ where: { Username: username } })) {
		userCount++;
		username = `${usernameBase}${String(userCount).padStart(4, "0")}`;
	}

	const hashedPassword = await bcrypt.hash(Password, 10);
	const newUser = await User.create({
		Username: username,
		MemberId,
		Password: hashedPassword,
		RoleId,
	});

	if (newUser) {
		return res
			.status(201)
			.json({ Username: newUser.Username, MemberId: newUser.MemberId });
	}

	return res.status(400).json({ error: "User data is invalid" });
});

//@desc Login user
//@route POST /api/user/login
//@access private
const loginUser = asyncHandler(async (req, res) => {
	const { Username, Password } = req.body;

	if (!Username || !Password) {
		return res.status(400).json({ error: "All fields are mandatory!" });
	}

	const user = await User.findOne({ where: { Username } });

	if (user && (await bcrypt.compare(Password, user.Password))) {
		const role = await Role.findOne({ where: { RoleId: user.RoleId } });
		const member = await Member.findOne({ where: { MemberId: user.MemberId } });
		const accessToken = jwt.sign(
			{
				user: {
					Username: user.Username,
					MemberId: user.MemberId,
					Role: role.Name,
					FirstName: member.FirstName,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);
		return res.status(200).json({
			accessToken,
			user: {
				Username: user.Username,
				Role: role.Name,
				FirstName: member.FirstName,
			},
		});
	}

	return res.status(401).json({ error: "Username or Password is invalid" });
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
	res.json(`Login Sucessfully! Hello, ${req.user.Username}`);
});

module.exports = { registerUser, loginUser, currentUser };
