const asyncHandler = require("express-async-handler");
const Sales = require("../models/saleModel");
const Members = require("../models/memberModel");
const Sequelize = require("sequelize");
const crypto = require("crypto");

function generateSaleId() {
	return crypto.randomBytes(5).toString("hex");
}

function generateReceiptNumber() {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0");
	const date = String(currentDate.getDate()).padStart(2, "0");

	const hour = String(currentDate.getHours()).padStart(2, "0");
	const min = String(currentDate.getMinutes()).padStart(2, "0");

	const randomBytes = crypto.randomBytes(5).toString("hex");
	//return `R${year}${month}${date}-${hour}${min}-${randomBytes}`;
	//Had to comment this out because it would generate a string longer than
	//the field in the DB which would lead to everyone having the same
	//receipt number if they were inputted on the same day
	return randomBytes;
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
	const { MemberId, SaleDate, PaymentMethod } = req.body;

	const unwantedFields = ["SaleId", "ReceiptNumber"];
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

	//Generating SaleId
	let SaleId = generateSaleId();
	let existingSale = await Sales.findOne({ where: { SaleId } });

	// Ensure the generated SaleId is unique
	while (existingSale) {
		SaleId = generateSaleId();
		existingMember = await Sales.findOne({ where: { SaleId } });
	}

	const ReceiptNumber = generateReceiptNumber();

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
