const asyncHandler = require("express-async-handler");
const {getAllMember} = require("../controllers/memberController")
const Member = require("../models/memberModel");
const json2csv = require('json2csv').parse;
const fs = require('fs');
const Sales = require("../models/saleModel");


const memberFields = ["FirstName","LastName","Phone","Email","StreetNumber","StreetName","Suburb","PostCode"];
const saleFields = ["SaleId", "MemberId", "ReceiptNumber", "SaleDate", "PaymentMethod"];

//@access public
//@ route GET /api/member/
const downloadMembersCSV = asyncHandler(async (req, res) => {

    console.log("downloadMemberCSV");
    console.log(memberFields);
	
    const members = await Member.findAll({
        raw: true 
    });
    
    console.log(members);

    let csv = json2csv(members, {memberFields});
    

    console.log(csv);

    // fs.writeFile('../csv_downloads/membersCSV.csv',csv, (err) => {
    //     if(err) throw err;
    //     console.log("CSV file is saved");
    // });

	res.status(200).send( csv );
    
});

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

module.exports = {
    downloadMembersCSV,
    downloadSalesCSV
}
