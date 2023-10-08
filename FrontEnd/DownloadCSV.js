

// buttons

const downloadMembersBtn = document.getElementById("downloadMembersBtn");
const downloadSalesBtn = document.getElementById("downloadSalesBtn");
const downloadFeedbackBtn = document.getElementById("downloadFeedbackBtn");

// const blob = new Blob({type: 'application/csv'});
// const url = URL.createObjectURL(blob);

//button handlers

const startCSVDownload = (csv) =>
{
    
    
    const blob = new Blob([csv], {type: "octet-stream"});
        const href = URL.createObjectURL(blob)
        const a = Object.assign(document.createElement("a"), {
        href,
        style: "display:none",
        download: "members.csv"
        });
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(href);
        a.remove();


}


const getAllMembers = async function() 
{
    try 
    {
		const response = await fetch(
			`http://localhost:5732/api/csv`
		);
		// const members = await response.json();
        const members = await response.text();
        // members.toString();
        console.log(members);

        

        startCSVDownload(members);

        

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