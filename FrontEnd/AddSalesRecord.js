//const { domainToUnicode } = require("url");

import { GetSalesRecordData } from "./GetSalesRecordData.js";
import { FormValidation } from "./FormValidation.js";
import { MemberIdRegEx, paymethodRegEx, ReceiptNoRegEx } from "./RegExSales.js";

// declaring html element constants
//inputs/select
const MemberIdInput = document.getElementById("MemberId");
const paymethodSelect = document.getElementById("paymethod");

//spans

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
		//update later with form validation check
		const salesRecordObject = {
			MemberId: salesRecord.getMemberId(),
			PaymentMethod: salesRecord.getpaymethod(),
		};
		console.log(salesRecordObject);

		fetch("http://localhost:5732/api/sale", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
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

		console.log(salesRecordObject);
	}

	salesRecord.consoleSaleDetails();
};

submitButton.onclick = onSubmitButtonClickHandler;

const onResetButtonClickHandler = () => {
	console.log("reset button clicked");
	window.location.reload();
}

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
	const input = document.getElementById("searchInput");
	const dropdown = document.getElementById("resultsDropdown");
	const searchTerm = input.value;

	if (searchTerm.length < 1) {
		dropdown.style.display = "none";
		return;
	}

	try {
		const response = await fetch(
			`http://localhost:5732/api/member/search?q=${searchTerm}`
		);
		const members = await response.json();

		dropdown.innerHTML = "";

		if (members.length === 0) {
			dropdown.innerHTML = "<div>No results found</div>";
		} else {
			members.slice(0, 5).forEach((member) => {
				const div = document.createElement("div");
				div.innerHTML = `${member.MemberId}-${member.FirstName} ${member.LastName}`;
				div.onclick = function () {
					document.getElementById("MemberId").value = member.MemberId; // Fill the MemberId input
					input.value = `${member.FirstName} ${member.LastName}`;
					dropdown.style.display = "none"; // Hide dropdown after selection
				};
				dropdown.appendChild(div);
			});
			dropdown.style.display = "block";
		}
	} catch (error) {
		dropdown.innerHTML = "<div>Error fetching results</div>";
		console.error("Error fetching search results:", error);
	}
}, 300); // 300ms delay debounce

//Search Member
function searchMembers() {
	debouncedSearchMembers();
}
document.getElementById("searchInput").addEventListener("keyup", searchMembers);

window.searchMembers = searchMembers;
