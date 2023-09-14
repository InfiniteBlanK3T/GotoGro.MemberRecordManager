const asyncHandler = require("express-async-handler");
const Sales = require("../models/saleModel");
const Members = require("../models/memberModel");
const Sequelize = require("sequelize");

function generateSaleId() {
	return crypto.randomBytes(5).toString("hex");
}

//---------------API---------------
//@access public
//@ route GET /api/sales/
const getAllSales = asyncHandler(async (req, res) => {
	const sales = await Sales.findAll();
	res.status(200).json({ sales });
});

//@access public
//@ route GET /api/sales/:id
const getSale = asyncHandler(async (req, res) => {
	const sale = await Sales.findByPk(req.params.id);
	if (!sale) {
		res.status(404);
		throw new Error(`Sale with SaleId: \`${req.params.id}\` not found`);
	}

	res.status(200).json(sale);
});

//@access public
//@ route PUT /api/sales/:id
const updateSale = asyncHandler(async (req, res) => {
	let sale = await Sales.findByPk(req.params.id);
	if (!sale) {
		res.status(404);
		throw new Error(`Sale with SaleId: \`${req.params.id}\` not found`);
	}

	// Check if the provided MemberId exists in the Member table
	if (req.body.MemberId) {
		const memberExists = await Members.findOne({
			where: { MemberId: req.body.MemberId },
		});
		if (!memberExists) {
			return res.status(400).json({
				error:
					"Invalid/ Undefined MemberId. Sale cannot be updated with this MemberId.",
			});
		}
	}

	sale = await sale.update(req.body);
	res.status(200).json(sale);
});

//@access public
//@ route POST /api/sales/
const createSale = asyncHandler(async (req, res) => {
	const unwantedFields = ["SaleId"];
	for (const field of unwantedFields) {
		if (req.body[field]) {
			return res.status(400).json({
				error: `Field ${field} should not be provided.  Stop iNjEcTing bRo`,
			});
		}
	}
	// Check if MemberId exists in the Member table
	const memberExists = await Members.findOne({ where: { MemberId } });

	if (!memberExists) {
		return res.status(400).json({
			error: "Invalid/ Cannot find MemberId. Sale cannot be created.",
		});
	}

	const { MemberId, ReceiptNumber, SaleDate, PaymentMethod } = req.body;

	//Generating SaleId
	let SaleId = generateMemberId();
	let existingSale = await Sales.findOne({ where: { SaleId } });

	// Ensure the generated MemberId is unique
	while (existingSale) {
		SaleId = generateSaleId();
		existingMember = await Sales.findOne({ where: { SaleId } });
	}

	try {
		const sale = await Sales.create({
			SaleId,
			MemberId,
			ReceiptNumber,
			SaleDate,
			PaymentMethod,
		});

		res.status(201).json(sale);
	} catch (error) {
		if (error instanceof Sequelize.ValidationError) {
			const messages = error.errors.map((err) => err.message);
			return res.status(400).json({ errors: messages });
		}
		throw error;
	}
});

//@access public
//@ route DELETE /api/sales/:id
const deleteSale = asyncHandler(async (req, res) => {
	const sale = await Sales.findByPk(req.params.id);

	if (!sale) {
		res.status(404);
		throw new Error(`Sale with Id: \`${req.params.id}\` not found`);
	}

	await sale.destroy();
	res.status(200).json(sale);
});

module.exports = {
	getAllSales,
	getSale,
	updateSale,
	createSale,
	deleteSale,
};
