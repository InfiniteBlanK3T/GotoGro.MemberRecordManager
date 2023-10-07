
// buttons

const downloadMembersBtn = document.getElementById("downloadMembersBtn");
const downloadSalesBtn = document.getElementById("downloadSalesBtn");
const downloadFeedbackBtn = document.getElementById("downloadFeedbackBtn");


//button handlers


const getAllMembers = async function() 
{
    try 
    {
		const response = await fetch(
			`http://localhost:5732/api/member/`
		);
		const members = await response.json();
        console.log(members);

        
    }
    catch (error)
    {
        console.error("Error fetching search results:", error);
    }
    
}


const onDownloadMembersBtnHandler = () => {
    console.log("Download Members Button Clicked");
    getAllMembers();
   

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