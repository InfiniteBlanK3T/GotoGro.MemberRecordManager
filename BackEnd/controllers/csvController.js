const asyncHandler = require("express-async-handler");
const {getAllMember} = require("../controllers/memberController")
const Member = require("../models/memberModel");
const json2csv = require('json2csv').parse;
const fs = require('fs');


const memberFields = ["FirstName","LastName","Phone","Email","StreetNumber","StreetName","Suburb","PostCode"];

const downloadMembersCSV = asyncHandler(async (req, res) => {

    console.log("downloadMemberCSV");
    console.log(memberFields);
	
    const members = await Member.findAll({
        raw: true 
    }
    );
    
    console.log(members);

    let csv = json2csv(members, {memberFields});
    

    console.log(csv);

    fs.writeFile('../csv_downloads/membersCSV.csv',csv, (err) => {
        if(err) throw err;
        console.log("CSV file is saved");
    });

    

	res.status(200).send( csv );
    res.status(200).set("content-Type", "text/plain").send()
    // res.download('../csv_downloads/membersCSV.csv');
});

module.exports = {
    downloadMembersCSV
}
