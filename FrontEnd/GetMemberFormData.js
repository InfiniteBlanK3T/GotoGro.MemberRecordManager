export class GetMemberFormData {
	constructor() {}

	consoleMemberDetails() {
		console.log(
			this.firstName,
			this.lastName,
			this.email,
			this.phone,
			this.fullAddress
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
        this.phone = aPhone.replace(/\s+/g, '');
		
	}
	setFullAddress(aFullAddress) {
		this.fullAddress = aFullAddress;
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
	getFullAddress() {
		return this.fullAddress;
	}
}