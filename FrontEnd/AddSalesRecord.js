

class GetSalesRecordData 
{
    constructor() {}

    setMemberId(aMemberId) { this.memberId = aMemberId; }
    setPaymentMethod(aPaymentMethod) { this.paymentMethod = aPaymentMethod; }
    setReceiptNo(aReceiptNo) { this.receiptNo = aReceiptNo; }

    getMemberId() { return this.memberId; }
    getPaymentMethod() { return this.paymentMethod; }
    getReceiptNo() { return this.receiptNo; }

    consoleSaleDetails()
    {
        console.log(
            this.memberId,
            this.paymentMethod,
            this.receiptNo
        )
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


// declaring html element constants
//inputs/select
const memberIdInput = document.getElementById("MemberId");
const paymentMethodSelect = document.getElementById("paymethod");
const receiptNoInput = document.getElementById("ReceiptNo");

//spans

const memberIdSpan = document.getElementById("memberIdSpan");
const paymentMethodSpan = document.getElementById("paymentMethodSpan");
const receiptNoSpan = document.getElementById("receiptNoSpan");

const submitButton = document.getElementById("submitButton");

// declaring class objects
const salesRecord = new GetSalesRecordData();

const fv_memberId = new FormValidation(MemberIdRegEx);
const fv_paymentMethod = new FormValidation(PaymentMethodRegEx);
const fv_receiptNo = new FormValidation(ReceiptNoRegEx);

// declaring variables

let AreInputsAllValid = true;

// function to set the user input to the GetSalesRecordData

const setSalesRecord = () => {
    salesRecord.setMemberId(memberIdInput.value);
    salesRecord.setPaymentMethod(paymentMethodSelect.value);
    salesRecord.setReceiptNo(receiptNoInput.value);
}

// function to perform form validation

const formValidationFunc = () => {
    let areInputsAllValid = true;

    fv_memberId.setInput(salesRecord.getMemberId());
    if(!fv_memberId.isInputValid())
    {
        memberIdSpan.innerHTML = "Member Id must only contain numbers!";
        areInputsAllValid = false;
    }
    else
    {
        memberIdSpan.innerHTML = "";
    }

    fv_paymentMethod.setInput(salesRecord.getPaymentMethod());
    if (!fv_paymentMethod.isInputValid()) 
    {
        paymentMethodSpan.innerHTML = "You must select a payment method!"; 
        areInputsAllValid = false;
    }
    else
    {
        paymentMethodSpan.innerHTML = "";
    }

    fv_receiptNo.setInput(salesRecord.getReceiptNo());
    if (!fv_receiptNo.isInputValid()) 
    {
        receiptNoSpan.innerHTML = "Receipt Number must only contain numbers!"; 
        areInputsAllValid = false;
    }
    else
    {
        receiptNoSpan.innerHTML = "";
    }

    return areInputsAllValid;

}


const onSubmitButtonClickHandler = () => { 
    console.log("submit button clicked");

    setSalesRecord();
    AreInputsAllValid = formValidationFunc();

    if (AreInputsAllValid) //update later with form validation check
    {
        const salesRecordObject = {
            MemberID: salesRecord.getMemberId(),
            PaymentMethod: salesRecord.getPaymentMethod(),
            ReceiptNumber: salesRecord.getReceiptNo()
        };

        fetch("http://localhost:5732/api/Sale", {
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


}

submitButton.onclick = onSubmitButtonClickHandler;