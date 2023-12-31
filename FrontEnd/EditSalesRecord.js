//const { domainToUnicode } = require("url");

import { GetSalesRecordData } from "./GetSalesRecordData.js";
import { FormValidation } from "./FormValidation.js";
import { MemberIdRegEx, paymethodRegEx, ReceiptNoRegEx } from "./RegExSales.js";

// declaring html element constants
//inputs/select
const MemberIdInput = document.getElementById("MemberId");
const paymethodSelect = document.getElementById("paymethod");

//spans

const searchMemberSpan = document.getElementById("searchMemberSpan");
const MemberIdSpan = document.getElementById("memberIdSpan");
const paymethodSpan = document.getElementById("paymentMethodSpan");

//buttons

const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");

// declaring class objects
const salesRecord = new GetSalesRecordData();

const fv_MemberId = new FormValidation(MemberIdRegEx);
const fv_paymethod = new FormValidation(paymethodRegEx);

// declaring variables

let AreInputsAllValid = true;

// function to set the user input to the GetSalesRecordData

const setSalesRecord = () => {
	salesRecord.setMemberId(MemberIdInput.value);
	salesRecord.setpaymethod(paymethodSelect.value);
};

// function to perform form validation

const formValidationFunc = () => {
	let areInputsAllValid = true;

	fv_MemberId.setInput(salesRecord.getMemberId());
	if (!fv_MemberId.isInputValid()) {
		memberIdSpan.innerHTML = "Member Id must only contain numbers and letters!";
		areInputsAllValid = false;
	} else {
		memberIdSpan.innerHTML = "";
	}

	fv_paymethod.setInput(salesRecord.getpaymethod());
	if (!fv_paymethod.isInputValid()) {
		paymentMethodSpan.innerHTML = "You must select a payment method!";
		areInputsAllValid = false;
	} else {
		paymentMethodSpan.innerHTML = "";
	}

	return areInputsAllValid;
};

const onSubmitButtonClickHandler = () => {
	console.log("submit button clicked");

	setSalesRecord();
	AreInputsAllValid = formValidationFunc();
	if (AreInputsAllValid) {
		const salesRecordObject = {
			MemberId: salesRecord.getMemberId(),
			PaymentMethod: salesRecord.getpaymethod(),
		};
		const accessToken = localStorage.getItem("accessToken");

		fetch("http://localhost:5732/api/sale", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(salesRecordObject),
		})
			.then((response) => response.json())
			.then((data) => {
				alert("Success!");
				console.log("Success:", data);
			})
			.catch((error) => {
				alert("Error");
				console.error("Error:", error);
			});
	}

	salesRecord.consoleSaleDetails();
};

submitButton.onclick = onSubmitButtonClickHandler;

const onResetButtonClickHandler = () => {
	console.log("reset button clicked");
	window.location.reload();
};

resetButton.onclick = onResetButtonClickHandler;

// Debounce to reduce number of API calls
function debounce(func, delay) {
	let debounceTimer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
}

const debouncedSearchMembers = debounce(async function () {
	const input = document.getElementById("searchSalesId");
	const dropdown = document.getElementById("resultsDropdown");
	const searchTerm = input.value;
	const accessToken = localStorage.getItem("accessToken");

	if (searchTerm.length < 1) {
		dropdown.style.display = "none";
		return;
	}

	try {
		const response = await fetch(
			`http://localhost:5732/api/sale/search?q=${searchTerm}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		const sales = await response.json();

		console.log(sales);

		dropdown.innerHTML = "";

		if (sales.length === 0) {
			searchMemberSpan.innerHTML = "No results found.";
		} else {
			searchMemberSpan.innerHTML = "";

			sales.slice(0, 5).forEach((sale) => {
				const div = document.createElement("div");
				div.innerHTML = `${sale.SaleId}`;
				div.onclick = function () {
					document.getElementById("MemberId").value = sale.MemberId;
					input.value = sale.SaleId;
					paymethodSelect.value = sale.PaymentMethod;
					dropdown.style.display = "none";
				};
				dropdown.appendChild(div);
			});
			dropdown.style.display = "block";
		}
	} catch (error) {
		dropdown.innerHTML = "<div>Error fetching results</div>";
		console.error("Error fetching search results:", error);
	}
}, 300);
// 300ms delay debounce

//Search Member
function searchSales() {
	console.log("searchSales");
	debouncedSearchMembers();
}
document.getElementById("searchSalesId").addEventListener("keyup", searchSales);

window.searchSales = searchSales;
