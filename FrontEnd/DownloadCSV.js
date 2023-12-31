// buttons
const downloadMembersBtn = document.getElementById("downloadMembersBtn");
const downloadSalesBtn = document.getElementById("downloadSalesBtn");
const downloadFeedbackBtn = document.getElementById("downloadFeedbackBtn");

// fetch consts
const fetchAllMembersURL = `http://localhost:5732/api/csv`;
const fetchAllSalesURL = `http://localhost:5732/api/csv/csvSales`;
const fetchAllFeedbackURL = `http://localhost:5732/api/csv/csvFeedback`;

// file names consts
const membersFileName = "Members";
const salesFileName = "Sales";
const feedbackFileName = "Feedback";

// function to download csv
const startCSVDownload = (aCsv, aFilename) => {
	const blob = new Blob([aCsv], { type: "octet-stream" });
	const href = URL.createObjectURL(blob);
	const a = Object.assign(document.createElement("a"), {
		href,
		style: "display:none",
		download: `${aFilename}.csv`,
	});
	document.body.appendChild(a);
	a.click();
	URL.revokeObjectURL(href);
	a.remove();
};

// generic function to handle members, sales and feedback fetching for all records
const downloadAllRecords = async function (aURL, aFilename) {
	const accessToken = localStorage.getItem("accessToken");
	try {
		const response = await fetch(aURL, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const data = await response.text();
		console.log(data);
		startCSVDownload(data, aFilename);
	} catch (error) {
		console.error("Error fetching search results:", error);
	}
};

// button handlers
const onDownloadMembersBtnHandler = () => {
	console.log("Download Members Button Clicked");
	downloadAllRecords(fetchAllMembersURL, membersFileName);
};
downloadMembersBtn.onclick = onDownloadMembersBtnHandler;

const onDownloadSalesBtnHandler = () => {
	console.log("Download Sales Button Clicked");
	downloadAllRecords(fetchAllSalesURL, salesFileName);
};
downloadSalesBtn.onclick = onDownloadSalesBtnHandler;

const onDownloadFeedbackBtnHandler = () => {
	console.log("Download Feedback Button Clicked");
	downloadAllRecords(fetchAllFeedbackURL, feedbackFileName);
};
downloadFeedbackBtn.onclick = onDownloadFeedbackBtnHandler;
