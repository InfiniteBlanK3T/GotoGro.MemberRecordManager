//const { domainToUnicode } = require("url");


class GetSalesRecordData 
{
    constructor() {}


        consoleSaleDetails(){          
            console.log(
                this.MemberId,
                this.paymethod,
                this.receiptNo,
                this.SaleDate
            );
        }


    setMemberId(MemberId) {
        this.MemberId = MemberId;
        console.log(this.MemberId);
    }

    setpaymethod(paymethod){
        this.paymethod = paymethod;
        console.log(this.paymethod);
    }

    setReceiptNo(ReceiptNo){
        this.ReceiptNo =  ReceiptNo;
        console.log(this.ReceiptNo);
    }

    setSaleDate(SaleDate){
        this.SaleDate = SaleDate;
        console.log(this.SaleDate);
    }
    

    
        //getters
    
        getMemberId() {
            return this.MemberId;
        }
        getpaymethod() {
            return this.paymethod;
        }
        getReceiptNo(){
            return this.ReceiptNo;
        }
        getSaleDate()
        {
            return this.SaleDate;
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
const MemberIdInput = document.getElementById("MemberId");
const paymethodSelect = document.getElementById("paymethod");
const receiptNoInput = document.getElementById("ReceiptNo");
const SaleDateInput = document.getElementById("SaleDate")

//spans

const MemberIdSpan = document.getElementById("MemberIdSpan");
const paymethodSpan = document.getElementById("paymethodSpan");
const receiptNoSpan = document.getElementById("receiptNoSpan");

const submitButton = document.getElementById("submitButton");

// declaring class objects
const salesRecord = new GetSalesRecordData();

const fv_MemberId = new FormValidation(MemberIdRegEx);
const fv_paymethod = new FormValidation(paymethodRegEx); 
const fv_receiptNo = new FormValidation(ReceiptNoRegEx);

// declaring variables

let AreInputsAllValid = true;

// function to set the user input to the GetSalesRecordData

const setSalesRecord = () => {
    salesRecord.setMemberId(MemberIdInput.value);
    salesRecord.setpaymethod(paymethodSelect.value);
    salesRecord.setReceiptNo(receiptNoInput.value);
    salesRecord.setSaleDate(SaleDateInput.value);
}

// function to perform form validation

const formValidationFunc = () => {
    let areInputsAllValid = true;

    fv_MemberId.setInput(salesRecord.getMemberId());
    if(!fv_MemberId.isInputValid())
    {
        memberIdSpan.innerHTML = "Member Id must only contain numbers!";
        areInputsAllValid = false;
    }
    else
    {
        memberIdSpan.innerHTML = "";
    }

    fv_paymethod.setInput(salesRecord.getpaymethod());
    if (!fv_paymethod.isInputValid()) 
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
    AreInputsAllValid = true 
    //formValidationFunc();
    if (AreInputsAllValid) //update later with form validation check
    {
        const salesRecordObject = {
            MemberId: salesRecord.getMemberId(),
            PaymentMethod: salesRecord.getpaymethod(),
            //ReceiptNumber: salesRecord.getReceiptNo(),
            //DB expects there to be no receipt number sent to it 
            SaleDate: salesRecord.getSaleDate()
        };
        console.log(salesRecordObject)

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
    
    salesRecord.consoleSaleDetails();
}

submitButton.onclick = onSubmitButtonClickHandler;