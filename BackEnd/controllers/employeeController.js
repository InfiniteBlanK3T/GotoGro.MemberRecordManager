const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");
const Sequelize = require("sequelize");

//---------------API---------------
//@access public
//@ route GET /api/employee/
const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.findAll();
  res.status(200).json({ employees });
});

//@access public
//@ route GET /api/employee/:id
const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) {
    return res
      .status(404)
      .json({ error: `Employee with ID: ${req.params.id} not found` });
  }
  res.status(200).json(employee);
});

//@access public
//@ route PUT /api/employee/:id
const updateEmployee = asyncHandler(async (req, res) => {
  let employee = await Employee.findByPk(req.params.id);
  if (!employee) {
    return res
      .status(404)
      .json({ error: `Employee with ID: ${req.params.id} not found` });
  }
  employee = await employee.update(req.body);
  res.status(200).json(employee);
});

//@access public
//@ route POST /api/employee/
const createEmployee = asyncHandler(async (req, res) => {
  const {
    EmployeeId,
    FirstName,
    LastName,
    Phone,
    Email,
    StreetNumber,
    StreetName,
    Suburb,
    PostCode,
  } = req.body;

  try {
    const employee = await Employee.create({
      EmployeeId,
      FirstName,
      LastName,
      Phone,
      Email,
      StreetNumber,
      StreetName,
      Suburb,
      PostCode,
    });

    res.status(201).json(employee);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    throw error;
  }
});

//@access public
//@ route DELETE /api/employee/:id
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) {
    return res
      .status(404)
      .json({ error: `Employee with ID: ${req.params.id} not found` });
  }
  await employee.destroy();
  res.status(204).send();
});

module.exports = {
  getAllEmployees,
  getEmployee,
  updateEmployee,
  createEmployee,
  deleteEmployee,
};
