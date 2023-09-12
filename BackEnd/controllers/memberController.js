const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");
const Sequelize = require("sequelize");
const crypto = require("crypto");

function generateMemberId() {
	return crypto.randomBytes(5).toString("hex"); // returns a random string of 10 characters
}

//---------------API---------------
//@access public
//@ route GET /api/member/
const getAllMembers = asyncHandler(async (req, res) => {
	const members = await Member.findAll();
	res.status(200).json({ members });
});

//@access public
//@ route GET /api/member/:id
const getMember = asyncHandler(async (req, res) => {
	const member = await Member.findByPk(req.params.id);
	if (!member) {
		return res
			.status(404)
			.json({ error: `Member with ID: ${req.params.id} not found` });
	}
	res.status(200).json(member);
});

//@access public
//@ route PUT /api/member/:id
const updateMember = asyncHandler(async (req, res) => {
	let member = await Member.findByPk(req.params.id);
	if (!member) {
		return res
			.status(404)
			.json({ error: `Member with ID: ${req.params.id} not found` });
	}
	member = await member.update(req.body);
	res.status(200).json(member);
});

//@access public
//@ route POST /api/member/
const createMember = asyncHandler(async (req, res) => {
	const {
		FirstName,
		LastName,
		Phone,
		Email,
		StreetNumber,
		StreetName,
		Suburb,
		PostCode,
	} = req.body;

	// Generate a unique MemberId
	let MemberId = generateMemberId();
	let existingMember = await Member.findOne({ where: { MemberId } });

	// Ensure the generated MemberId is unique
	while (existingMember) {
		MemberId = generateMemberId();
		existingMember = await Member.findOne({ where: { MemberId } });
	}

	try {
		const member = await Member.create({
			MemberId,
			FirstName,
			LastName,
			Phone,
			Email,
			StreetNumber,
			StreetName,
			Suburb,
			PostCode,
		});

		res.status(201).json(member);
	} catch (error) {
		if (error instanceof Sequelize.ValidationError) {
			const messages = error.errors.map((err) => err.message);
			return res.status(400).json({ errors: messages });
		}
		throw error;
	}
});

//@access public
//@ route DELETE /api/member/:id
const deleteMember = asyncHandler(async (req, res) => {
	const member = await Member.findByPk(req.params.id);
	if (!member) {
		return res
			.status(404)
			.json({ error: `Member with ID: ${req.params.id} not found` });
	}
	await member.destroy();
	res.status(204).send();
});

module.exports = {
	getAllMembers,
	getMember,
	updateMember,
	createMember,
	deleteMember,
};
