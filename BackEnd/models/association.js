const Employee = require("./employeeModel.js");
const Feedback = require("./feedbackModel.js");
const Item = require("./itemModel.js");
const Member = require("./memberModel.js");
const Sales = require("./saleModel.js");
const Permissions = require("./permissionModel.js");

// Associations

// Member and Feedback
Member.hasMany(Feedback, { foreignKey: "MemberId", as: "Feedbacks" });
Feedback.belongsTo(Member, { foreignKey: "MemberId" });

// Member and Sales
Member.hasMany(Sales, { foreignKey: "MemberId", as: "SalesRecords" });
Sales.belongsTo(Member, { foreignKey: "MemberId" });

// Sales and Item
Sales.hasMany(Item, { foreignKey: "SaleId", as: "Items" });
Item.belongsTo(Sales, { foreignKey: "SaleId" });

// Employee and Permissions
Employee.hasOne(Permissions, { foreignKey: "EmployeeId", as: "Permission" });
Permissions.belongsTo(Employee, { foreignKey: "EmployeeId" });

//Further use for this one if needed
// module.exports = {
//   initializeAssociations: function () {

//   },
// };
