
// buttons

const downloadMembersBtn = document.getElementById("downloadMembersBtn");
const downloadSalesBtn = document.getElementById("downloadSalesBtn");
const downloadFeedbackBtn = document.getElementById("downloadFeedbackBtn");


//button handlers

const onDownloadMembersBtnHandler = () => {
    console.log("Download Members Button Clicked");

}

downloadMembersBtn.onclick = onDownloadMembersBtnHandler;

const onDownloadSalesBtnHandler = () => {
    console.log("Download Sales Button Clicked");

}

downloadSalesBtn.onclick = onDownloadSalesBtnHandler;

const onDownloadFeedbackBtnHandler = () => {
    console.log("Download Feedback Button Clicked");

}

downloadFeedbackBtn.onclick = onDownloadFeedbackBtnHandler;