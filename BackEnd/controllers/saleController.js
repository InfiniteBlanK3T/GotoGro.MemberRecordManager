const asyncHandler = require("express-async-handler");
const Sales = require("../models/saleModel");
const Members = require("../models/memberModel");
const Sequelize = require("sequelize");
const crypto = require("crypto");
const { Op } = require("sequelize");

function generateSaleId() {
	return crypto.randomBytes(5).toString("hex");
}

function generateReceiptNumber() {
	const randomBytes = crypto.randomBytes(4).toString("hex").toUpperCase();
	return `R-${randomBytes}`;
}

// Generate current date in YYYY-MM-DD format to add to the database when adding a sales record
function generateDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const date = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${date}`;
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
	const { MemberId, PaymentMethod } = req.body;

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
	// get both the current data and the receipt nubmer so that it doesn't have to be entered by the front end
	const ReceiptNumber = generateReceiptNumber();
	const SaleDate = generateDate();

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

const searchSales = async (req, res) => {
	try 
	{
		const searchTerm = req.query.q;

		const sales = await Sales.findAll({
			where: {
				[Op.or]: [
					{ SaleId: { [Op.like]: "%" + searchTerm + "%" } },
					
				],
			},
		});
		res.status(200).json(sales);
	}
	catch (error)
	{
		res.status(500).json({ message: "Server Error", error });
	}
}

module.exports = {
	getAllSales,
	getSale,
	updateSale,
	createSale,
	deleteSale,
	searchSales
};
