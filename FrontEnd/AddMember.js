
//importing classes 

import { FormValidation } from "./FormValidation.js";
import { GetMemberFormData } from "./GetMemberFormData.js";
import { firstNameRegEx, lastNameRegEx, emailRegEx, phoneRegEx } from "./RegEx.js";

// Declaring RegEx Constants

/// ***** NOW IN RegEx.js file ******

// declaring html element constants
// inputs
const firstNameInput = document.getElementById("aFirstName");
const lastNameInput = document.getElementById("aLastName");
const emailInput = document.getElementById("aEmail");
const phoneInput = document.getElementById("aPhone");
const addressInput = document.getElementById("aFullAddress");

//spans
const firstNameSpan = document.getElementById("firstNameSpan");
const lastNameSpan = document.getElementById("lastNameSpan");
const emailSpan = document.getElementById("emailSpan");
const phoneSpan = document.getElementById("phoneSpan");
const addressSpan = document.getElementById("addressSpan");

//buttons
const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");

// declaring class instances

const newMember = new GetMemberFormData();

const fv_firstName = new FormValidation(firstNameRegEx);
const fv_lastName = new FormValidation(lastNameRegEx);
const fv_email = new FormValidation(emailRegEx);
const fv_phone = new FormValidation(phoneRegEx);

// declaring variables

let AreInputsAllValid = true;

// declaring data object

// function to set the user input to the newMember object

const setMemberData = () => {
	newMember.setFirstName(firstNameInput.value);
	newMember.setLastName(lastNameInput.value);
	newMember.setEmail(emailInput.value);
	newMember.setPhone(phoneInput.value);
	newMember.setFullAddress(addressInput.value);
};

//-------------Geo Validation API Segmentation --------------------
const input = document.getElementById("aFullAddress");
const autocomplete = new google.maps.places.Autocomplete(input);

autocomplete.addListener("place_changed", function () {
	const place = autocomplete.getPlace();
	let addressComponents = {};
	for (const component of place.address_components) {
		const componentType = component.types[0];
		switch (componentType) {
			case "street_number":
				addressComponents.StreetNumber = component.long_name;
				break;
			case "route":
				addressComponents.StreetName = component.long_name;
				break;
			case "locality":
				addressComponents.Suburb = component.long_name;
				break;
			case "postal_code":
				addressComponents.PostCode = component.long_name;
				break;
			case "country":
				addressComponents.Country = component.long_name;
				break;
		}
	}
	console.log(addressComponents);
});

// function to perform form validation

const formValidationFunc = () => {
	// setting fv_instances
	let areInputsAllValid = true;

	fv_firstName.setInput(newMember.getFirstName());
	if (!fv_firstName.isInputValid()) {
		firstNameSpan.innerHTML = "First name may only contain letters!";
		areInputsAllValid = false;
	} else {
		firstNameSpan.innerHTML = "";
	}

	fv_lastName.setInput(newMember.getLastName());
	if (!fv_lastName.isInputValid()) {
		lastNameSpan.innerHTML = "Last name may only contain letters!";
		areInputsAllValid = false;
	} else {
		lastNameSpan.innerHTML = "";
	}

	fv_email.setInput(newMember.getEmail());
	if (!fv_email.isInputValid()) {
		emailSpan.innerHTML = "Email address must be valid!";
		areInputsAllValid = false;
	} else {
		emailSpan.innerHTML = "";
	}

	fv_phone.setInput(newMember.getPhone());
	if (!fv_phone.isInputValid()) {
		phoneSpan.innerHTML = "Phone number must be valid!";
		areInputsAllValid = false;
	} else {
		phoneSpan.innerHTML = "";
	}

	return areInputsAllValid;
};

const onSubmitButtonClickHandler = () => {
	console.log("Submit Button Clicked");

	setMemberData();
	console.log("member: ", newMember);
	AreInputsAllValid = formValidationFunc();

	console.log("Are All Inputs Valid: ", AreInputsAllValid);

	if (AreInputsAllValid) {
		const memberDataObject = {
			FirstName: newMember.getFirstName(),
			LastName: newMember.getLastName(),
			Email: newMember.getEmail(),
			Phone: newMember.getPhone(),
			FullAddress: newMember.getFullAddress()
		};
		//BackEnd - fetch from API
		fetch("http://localhost:5732/api/member", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(memberDataObject),
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

	newMember.consoleMemberDetails();
};
submitButton.onclick = onSubmitButtonClickHandler;

const onResetButtonClickHandler = () => {
	console.log("reset button clicked");
	window.location.reload();
}

resetButton.onclick = onResetButtonClickHandler;
