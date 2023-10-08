const asyncHandler = require("express-async-handler");
const {getAllMember} = require("../controllers/memberController")
const Member = require("../models/memberModel");
const json2csv = require('json2csv').parse;
const fs = require('fs');
const Sales = require("../models/saleModel");
const Feedback = require("../models/feedbackModel");


const memberFields = ["FirstName","LastName","Phone","Email","StreetNumber","StreetName","Suburb","PostCode"];
const saleFields = ["SaleId", "MemberId", "ReceiptNumber", "SaleDate", "PaymentMethod"];
const feedbackFields = [];

//@access public
//@ route GET /api/csv/
const downloadMembersCSV = asyncHandler(async (req, res) => {

    console.log("downloadMemberCSV");
    console.log(memberFields);
    const members = await Member.findAll({
        raw: true 
    });

    console.log(members);
    let csv = json2csv(members, {memberFields});
    console.log(csv);
	res.status(200).send( csv );
    
});

//@access public
//@ route GET /api/csv/csvSales

const downloadSalesCSV = asyncHandler(async (req, res) =>{
    console.log("downloadSalesCSV");
    const sales = await Sales.findAll({
        raw: true
    });

    console.log(sales);
    let csvSales = json2csv(sales,{saleFields});
    console.log(csvSales);
    res.status(200).send(csvSales);

});

//@access public
//@ route GET /api/csv/csvFeedback

const downloadFeedbackCSV = asyncHandler(async (req, res) =>{
    console.log("downloadSalesCSV");
    const feedback = await Feedback.findAll({
        raw: true
    });

    console.log(feedback);
    let csvFeedback = json2csv(feedback,{feedbackFields});
    console.log(csvFeedback);
    res.status(200).send(csvFeedback);

});

module.exports = {
    downloadMembersCSV,
    downloadSalesCSV,
    downloadFeedbackCSV
}
