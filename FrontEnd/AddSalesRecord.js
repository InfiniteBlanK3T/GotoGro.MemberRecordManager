

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


// declaring html element constants
const memberIdInput = document.getElementById("MemberId");
const paymentMethodSelect = document.getElementById("paymethod");
const receiptNoInput = document.getElementById("ReceiptNo");

const submitButton = document.getElementById("submitButton");

const salesRecord = new GetSalesRecordData();

// function to set the user input to the GetSalesRecordData

const setSalesRecord = () => {
    salesRecord.setMemberId(memberIdInput.value);
    salesRecord.setPaymentMethod(paymentMethodSelect.value);
    salesRecord.setReceiptNo(receiptNoInput.value);
}

const onSubmitButtonClickHandler = () => { 
    console.log("submit button clicked");

    setSalesRecord();

    if (true) //update later with form validation check
    {
        const salesRecordObject = {
            MemberID: salesRecord.getMemberId(),
            PaymentMethod: salesRecord.getPaymentMethod(),
            ReceiptNumber: salesRecord.getReceiptNo()
        }

        console.log(salesRecordObject);
    }


}

submitButton.onclick = onSubmitButtonClickHandler;