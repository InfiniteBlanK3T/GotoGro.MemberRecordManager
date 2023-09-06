
class GetMemberFormData
{   
    constructor(aFirstName, aLastName, aEmail, aPhone, aStreetNo, aStreetName, aSuburb, aPostcode)
    {
        this.firstName = aFirstName;
        this.lastName = aLastName;
        this.email = aEmail;
        this.phone = aPhone;
        this.streetNo = aStreetNo;
        this.streetName = aStreetName;
        this.suburb = aSuburb;
        this.postcode = aPostcode
    }

    consoleMemberDetails()
    {
        console.log(this.firstName,this.lastName,this.email,this.phone, this.streetNo,this.streetName,this.suburb,this.postcode);
    }

    getFirstName() { return this.firstName; }
    getLastName() { return this.lastName; }
    getEmail() { return this.email; }
    getPhone() { return this.phone; }
    getStreetNo() { return this.streetNo; }
    getStreetName() { return this.streetName; }
    getSuburb() { return this.suburb; }
    getPostcode() { return this.postcode; }
    
}

class FormValidation
{
    constructor(aInput, aRegEx)
    {
        this.input = aInput;
        this.regEx = aRegEx;
    }

    isInputValid()
    {
        if (this.input == "")
        {
            return false;
        }
        else if (!this.input.match(this.regEx)) 
        {
            return false;
        } 
        else 
        {
            return true;
        }
    }


}

// Declaring RegEx Constants

const firstNameRegEx = /^[a-zA-Z]{2,20}/;
const lastNameRegEx = /\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*){1,20}/;
const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;




const submitButton = document.getElementById("submitButton");


const onSubmitButtonClickHandler = () => {
    console.log("Submit Button Clicked");
    const newMember = new GetMemberFormData(
        document.getElementById("aFirstName").value,
        document.getElementById("aLastName").value,
        document.getElementById("aEmail").value,
        document.getElementById("aPhone").value,
        document.getElementById("aStreetNo").value,
        document.getElementById("aStreetName").value,
        document.getElementById("aSuburb").value,
        document.getElementById("aPostcode").value,
    );
    newMember.consoleMemberDetails();

   
}
submitButton.onclick = onSubmitButtonClickHandler;