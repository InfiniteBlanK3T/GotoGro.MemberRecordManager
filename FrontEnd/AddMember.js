class GetMemberFormData {
	constructor() {}

	consoleMemberDetails() {
		console.log(
			this.firstName,
			this.lastName,
			this.email,
			this.phone,
			this.streetNo,
			this.streetName,
			this.suburb,
			this.postcode
		);
	}

	//setters

	setFirstName(aFirstName) {
		this.firstName = aFirstName;
	}
	setLastName(aLastName) {
		this.lastName = aLastName;
	}
	setEmail(aEmail) {
		this.email = aEmail;
	}
	setPhone(aPhone) {
		this.phone = aPhone;
	}
	setStreetNo(aStreetNo) {
		this.streetNo = aStreetNo;
	}
	setStreetName(aStreetName) {
		this.streetName = aStreetName;
	}
	setSuburb(aSuburb) {
		this.suburb = aSuburb;
	}
	setPostcode(aPostcode) {
		this.postcode = aPostcode;
	}

	//getters

	getFirstName() {
		return this.firstName;
	}
	getLastName() {
		return this.lastName;
	}
	getEmail() {
		return this.email;
	}
	getPhone() {
		return this.phone;
	}
	getStreetNo() {
		return this.streetNo;
	}
	getStreetName() {
		return this.streetName;
	}
	getSuburb() {
		return this.suburb;
	}
	getPostcode() {
		return this.postcode;
	}
}

class FormValidation {
	constructor(aRegEx) {
		this.regEx = aRegEx;
	}

	//setters

	setInput(aInput) {
		this.input = aInput;
	}
	setRegEx(aRegEx) {
		this.regEx = aRegEx;
	}

	//getters

	getInput() {
		return this.input;
	}
	getRegEx() {
		return this.regEx;
	}

	isInputValid() {
		if (this.input == "") {
			return false;
		} else if (!this.input.match(this.regEx)) {
			return false;
		} else {
			return true;
		}
	}
}

// Declaring RegEx Constants

/// ***** NOW IN RegEx.js file ******

// declaring html element constants
// inputs
const firstNameInput = document.getElementById("aFirstName");
const lastNameInput = document.getElementById("aLastName");
const emailInput = document.getElementById("aEmail");
const phoneInput = document.getElementById("aPhone");
const streetNoInput = document.getElementById("aStreetNo");
const streetNameInput = document.getElementById("aStreetName");
const suburbInput = document.getElementById("aSuburb");
const postcodeInput = document.getElementById("aPostcode");

//spans
const firstNameSpan = document.getElementById("firstNameSpan");
const lastNameSpan = document.getElementById("lastNameSpan");
const emailSpan = document.getElementById("emailSpan");
const phoneSpan = document.getElementById("phoneSpan");
const streetNoSpan = document.getElementById("streetNoSpan");
const streetNameSpan = document.getElementById("streetNameSpan");
const suburbSpan = document.getElementById("suburbSpan");
const postcodeSpan = document.getElementById("postcodeSpan");

//buttons
const submitButton = document.getElementById("submitButton");

// declaring class instances

const newMember = new GetMemberFormData();

const fv_firstName = new FormValidation(firstNameRegEx);
const fv_lastName = new FormValidation(lastNameRegEx);
const fv_email = new FormValidation(emailRegEx);
const fv_phone = new FormValidation(phoneRegEx);
const fv_streetNo = new FormValidation(streetNoRegEx);
const fv_streetName = new FormValidation(streetNameRegEx);
const fv_suburb = new FormValidation(suburbRegEx);
const fv_postcode = new FormValidation(postcodeRegEx);

// declaring variables

let AreInputsAllValid = true;

// declaring data object

// function to set the user input to the newMember object

const setMemberData = () => {
	newMember.setFirstName(firstNameInput.value);
	newMember.setLastName(lastNameInput.value);
	newMember.setEmail(emailInput.value);
	newMember.setPhone(phoneInput.value);
	newMember.setStreetNo(streetNoInput.value);
	newMember.setStreetName(streetNameInput.value);
	newMember.setSuburb(suburbInput.value);
	newMember.setPostcode(postcodeInput.value);
};

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

	fv_streetNo.setInput(newMember.getStreetNo());
	if (!fv_streetNo.isInputValid()) {
		streetNoSpan.innerHTML = "Street no must only contain numbers and letters!";
		areInputsAllValid = false;
	} else {
		streetNoSpan.innerHTML = "";
	}

	fv_streetName.setInput(newMember.getStreetName());
	if (!fv_streetName.isInputValid()) {
		streetNameSpan.innerHTML = "Street name must only contain letters!";
		areInputsAllValid = false;
	} else {
		streetNameSpan.innerHTML = "";
	}

	fv_suburb.setInput(newMember.getSuburb());
	if (!fv_suburb.isInputValid()) {
		suburbSpan.innerHTML = "Suburb must only contain letters!";
		areInputsAllValid = false;
	} else {
		suburbSpan.innerHTML = "";
	}

	fv_postcode.setInput(newMember.getPostcode());
	if (!fv_postcode.isInputValid()) {
		postcodeSpan.innerHTML = "Postcode must contain 4 numbers!";
		areInputsAllValid = false;
	} else {
		postcodeSpan.innerHTML = "";
	}

	return areInputsAllValid;
};

// BackEnd - Loading Indicator
const loadingIndicator = document.getElementById("loadingIndicator");

function showLoading() {
	loadingIndicator.style.display = "block";
}

function hideLoading() {
	loadingIndicator.style.display = "none";
}

const onSubmitButtonClickHandler = () => {
	console.log("Submit Button Clicked");

	setMemberData();
	AreInputsAllValid = formValidationFunc();

	console.log("Are All Inputs Valid: ", AreInputsAllValid);

	if (AreInputsAllValid) {
		const memberDataObject = {
			firstName: newMember.getFirstName(),
			lastName: newMember.getLastName(),
			email: newMember.getEmail(),
			phone: newMember.getPhone(),
			streetNo: newMember.getStreetNo(),
			streetName: newMember.getStreetName(),
			suburb: newMember.getSuburb(),
			postcode: newMember.getPostcode(),
		};
		console.log(memberDataObject);

		//BackEnd - fetch from API
		showLoading();
		fetch("BACKEND_ENDPOINT_URL", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(memberDataObject),
		})
			.then((response) => response.json())
			.then((data) => {
				hideLoading();
				console.log("Success:", data);
			})
			.catch((error) => {
				hideLoading();
				console.error("Error:", error);
			});
	}

	newMember.consoleMemberDetails();
};
submitButton.onclick = onSubmitButtonClickHandler;
