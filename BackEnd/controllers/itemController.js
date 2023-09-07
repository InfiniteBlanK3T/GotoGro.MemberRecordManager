const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");
const Sequelize = require("sequelize");

//---------------API---------------
//@access public
//@ route GET /api/items/
const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.findAll();
  res.status(200).json({ items });
});

//@access public
//@ route GET /api/items/:id
const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error(`Item with ItemId: \`${req.params.id}\` not found`);
  }

  res.status(200).json(item);
});

//@access public
//@ route PUT /api/items/:id
const updateItem = asyncHandler(async (req, res) => {
  let item = await Item.findByPk(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error(`Item with ItemId: \`${req.params.id}\` not found`);
  }

  item = await item.update(req.body);
  res.status(200).json(item);
});

//@access public
//@ route POST /api/items/
const createItem = asyncHandler(async (req, res) => {
  const { ItemId, SaleId, Quantity, Name, Price } = req.body;

  try {
    const item = await Item.create({
      ItemId,
      SaleId,
      Quantity,
      Name,
      Price,
    });

    res.status(201).json(item);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    throw error;
  }
});

//@access public
//@ route DELETE /api/items/:id
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findByPk(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error(`Item with ItemId: \`${req.params.id}\` not found`);
  }

  await item.destroy();
  res.status(200).json(item);
});

module.exports = {
  getAllItems,
  getItem,
  updateItem,
  createItem,
  deleteItem,
};
