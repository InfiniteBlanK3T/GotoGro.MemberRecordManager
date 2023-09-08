const asyncHandler = require("express-async-handler");
const Sales = require("../models/saleModel");
const Sequelize = require("sequelize");

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

	sale = await sale.update(req.body);
	res.status(200).json(sale);
});

//@access public
//@ route POST /api/sales/
const createSale = asyncHandler(async (req, res) => {
	const { SaleId, MemberId, ReceiptNumber, SaleDate, PaymentMethod } = req.body;

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
		throw new Error(`Sale with SaleId: \`${req.params.id}\` not found`);
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
