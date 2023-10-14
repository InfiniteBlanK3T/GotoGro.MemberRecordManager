"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Loading into Members Table
		await queryInterface.bulkInsert(
			"Members",
			[
				{
					MemberId: "1a2b3c4d5e",
					FirstName: "Alice",
					LastName: "Johnson",
					Phone: "1234567890",
					Email: "alice.johnson@email.com",
					StreetNumber: "12",
					StreetName: "Main St",
					Suburb: "Springfield",
					PostCode: "62704",
				},
				{
					MemberId: "6f7g8h9i0j",
					FirstName: "Bob",
					LastName: "Williams",
					Phone: "0987654321",
					Email: "bob.williams@email.com",
					StreetNumber: "34",
					StreetName: "Elm St",
					Suburb: "Shelbyville",
					PostCode: "35143",
				},
				{
					MemberId: "k1l2m3n4o5",
					FirstName: "Charlie",
					LastName: "Brown",
					Phone: "1122334455",
					Email: "charlie.brown@email.com",
					StreetNumber: "56",
					StreetName: "Pine St",
					Suburb: "Ogdenville",
					PostCode: "84414",
				},
				{
					MemberId: "p6q7r8s9t0",
					FirstName: "David",
					LastName: "Smith",
					Phone: "2233445566",
					Email: "david.smith@email.com",
					StreetNumber: "78",
					StreetName: "Oak St",
					Suburb: "North Haverbrook",
					PostCode: "27855",
				},
				{
					MemberId: "u1v2w3x4y5",
					FirstName: "Emily",
					LastName: "Davis",
					Phone: "3344556677",
					Email: "emily.davis@email.com",
					StreetNumber: "90",
					StreetName: "Maple St",
					Suburb: "Capital City",
					PostCode: "20500",
				},
				{
					MemberId: "z6a7b8c9d0",
					FirstName: "Frank",
					LastName: "Wilson",
					Phone: "4455667788",
					Email: "frank.wilson@email.com",
					StreetNumber: "21",
					StreetName: "Cedar St",
					Suburb: "Brockway",
					PostCode: "15824",
				},
				{
					MemberId: "e1f2g3h4i5",
					FirstName: "Grace",
					LastName: "Anderson",
					Phone: "5566778899",
					Email: "grace.anderson@email.com",
					StreetNumber: "43",
					StreetName: "Spruce St",
					Suburb: "Sutterville",
					PostCode: "95685",
				},
				{
					MemberId: "j6k7l8m9n0",
					FirstName: "Henry",
					LastName: "Thomas",
					Phone: "6677889900",
					Email: "henry.thomas@email.com",
					StreetNumber: "65",
					StreetName: "Birch St",
					Suburb: "Cypress Creek",
					PostCode: "77429",
				},
				{
					MemberId: "o1p2q3r4s5",
					FirstName: "Ivy",
					LastName: "Jackson",
					Phone: "7788990011",
					Email: "ivy.jackson@email.com",
					StreetNumber: "87",
					StreetName: "Fir St",
					Suburb: "East Springfield",
					PostCode: "31329",
				},
				{
					MemberId: "t6u7v8w9x0",
					FirstName: "Jack",
					LastName: "Harris",
					Phone: "8899001122",
					Email: "jack.harris@email.com",
					StreetNumber: "32",
					StreetName: "Ash St",
					Suburb: "West Springfield",
					PostCode: "01089",
				},
			],
			{}
		);
		// Loading into Roles Table
		await queryInterface.bulkInsert(
			"Roles",
			[
				{
					RoleId: "1",
					Name: "Employee",
				},
				{
					RoleId: "2",
					Name: "Manager",
				},
			],
			{}
		);
		//Loading int Permissions Table
		await queryInterface.bulkInsert("Permissions", [
			{
				PermissionId: "1",
				Name: "AddMember",
			},
			{
				PermissionId: "2",
				Name: "EditMember",
			},
			{
				PermissionId: "3",
				Name: "AddSales",
			},
			{
				PermissionId: "4",
				Name: "EditSales",
			},
			{
				PermissionId: "5",
				Name: "AddFeebacks",
			},
			{
				PermissionId: "6",
				Name: "DownloadCSV",
			},
		]);
		//Loading into RolePermissionMapping Table
		await queryInterface.bulkInsert("RolePermissionMapping", [
			{
				RoleId: "1",
				PermissionId: "1",
			},
			{
				RoleId: "1",
				PermissionId: "3",
			},
			{
				RoleId: "1",
				PermissionId: "5",
			},
			{
				RoleId: "2",
				PermissionId: "1",
			},
			{
				RoleId: "2",
				PermissionId: "2",
			},
			{
				RoleId: "2",
				PermissionId: "3",
			},
			{
				RoleId: "2",
				PermissionId: "4",
			},
			{
				RoleId: "2",
				PermissionId: "5",
			},
			{
				RoleId: "2",
				PermissionId: "6",
			},
		]);
		//Loading into User Table
		await queryInterface.bulkInsert("Users", [
			{
				Username: "BW0000",
				MemberId: "6f7g8h9i0j",
				Password:
					"$2b$10$b9oD6m25AIfmLhQlXQzguex4vrY5H9vlAYasY6EP2/8IU53keDf8O",
				RoleId: "1",
			},
			{
				Username: "HT0000",
				MemberId: "j6k7l8m9n0",
				Password:
					"$2b$10$/L.JBVXzfPK.FQxDR4JxlOJqWybQZm1nnY6u1aUBWOTrp9bEjFhwy",
				RoleId: "2",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
		await queryInterface.bulkDelete("RolePermissionMapping", null, {});
		await queryInterface.bulkDelete("Members", null, {});
		await queryInterface.bulkDelete("Roles", null, {});
		await queryInterface.bulkDelete("Permissions", null, {});
		await queryInterface.bulkDelete("Sales", null, {});
	},
};
