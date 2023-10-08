const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");
const Sequelize = require("sequelize");
const crypto = require("crypto");
const { Op } = require("sequelize");



function generateMemberId() {
	return crypto.randomBytes(5).toString("hex");
}

const googleMapsClient = require("@google/maps").createClient({
	key: "AIzaSyCdKqNl_GWb1DtYGOAr-or0Qcmix647tqk",
	Promise: Promise,
});

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
	const unwantedFields = [
		"MemberId",
		"StreetNumber",
		"StreetName",
		"Suburb",
		"PostCode",
	];
	for (const field of unwantedFields) {
		if (req.body[field]) {
			return res.status(400).json({
				error: `Field ${field} should not be provided. Stop iNjEcTing bRo`,
			});
		}
	}

	const { FirstName, LastName, Phone, Email, FullAddress } = req.body;

	// Validate the address using Google Maps Geocoding API
	const response = await googleMapsClient
		.geocode({ address: FullAddress })
		.asPromise();

	// Assuming the first result is the most accurate
	const addressComponents = response.json.results[0].address_components;

	const streetNumberComponent = addressComponents.find((comp) =>
		comp.types.includes("street_number")
	);
	const StreetNumber = streetNumberComponent
		? streetNumberComponent.long_name
		: null;

	const streetNameComponent = addressComponents.find((comp) =>
		comp.types.includes("route")
	);
	const StreetName = streetNameComponent ? streetNameComponent.long_name : null;

	const suburbComponent = addressComponents.find((comp) =>
		comp.types.includes("locality")
	);
	const Suburb = suburbComponent ? suburbComponent.long_name : null;

	const postCodeComponent = addressComponents.find((comp) =>
		comp.types.includes("postal_code")
	);
	const PostCode = postCodeComponent ? postCodeComponent.long_name : null;

	//Generating MemberID
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

// Search Member based on either ID or their Name
const searchMembers = async (req, res) => {
	try {
		const searchTerm = req.query.q;

		const members = await Member.findAll({
			where: {
				[Op.or]: [
					{ MemberId: { [Op.like]: "%" + searchTerm + "%" } },
					{ FirstName: { [Op.like]: "%" + searchTerm + "%" } },
					{ LastName: { [Op.like]: "%" + searchTerm + "%" } },
				],
			},
		});

		res.status(200).json(members);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error });
	}
};

module.exports = {
	getAllMembers,
	getMember,
	updateMember,
	createMember,
	deleteMember,
	searchMembers,
	
};
