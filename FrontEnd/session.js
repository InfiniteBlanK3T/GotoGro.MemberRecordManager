document.addEventListener("DOMContentLoaded", function () {
	const currentURL = window.location.pathname.split("/").pop();
	const navbar = document.querySelector(".navbar");
	const userRole = localStorage.getItem("userRole");
	const username = localStorage.getItem("username");
	const firstName = localStorage.getItem("firstName");
	const accessToken = localStorage.getItem("accessToken");

	if (currentURL !== "index.html" && (!accessToken || !userRole)) {
		window.location.href = "./index.html";
		return;
	}
	if (userRole) {
		showLinksBasedOnRole(navbar, userRole, username, firstName);
	} else {
		navbar.innerHTML = '<li><a href="./index.html">Home</a></li>';
	}
});

function showLinksBasedOnRole(navbar, role, username, firstName) {
	const roleLinks = {
		Employee: [
			{ text: "Home", href: "menu.html" },
			{ text: "Add Member", href: "AddMember.html" },
			{ text: "Add Sales", href: "AddSalesRecord.html" },
			{ text: "Add Feedback", href: "Feedback.html" },
		],
		Manager: [
			{ text: "Home", href: "menu.html" },
			{ text: "Add Member", href: "AddMember.html" },
			{ text: "Edit Member", href: "EditMember.html" },
			{ text: "Add Sales", href: "AddSalesRecord.html" },
			{ text: "Add Feedback", href: "Feedback.html" },
			{ text: "Edit Sales", href: "EditSalesRecord.html" },
			{ text: "Generate CSV", href: "DownloadCSV.html" },
		],
	};

	const generateLinks = (links) =>
		links
			.map((link) => `<li><a href="${link.href}">${link.text}</a></li>`)
			.join("");

	const greeting = `<span class="greeting">Login as ${username}. Hello, ${firstName}! | ${role} </span>`;
	const logoutLink = '<li><a href="#" id="logout">Logout</a></li>';

	navbar.innerHTML = `${greeting}${generateLinks(
		roleLinks[role] || []
	)}${logoutLink}`;

	document.getElementById("logout").addEventListener("click", function () {
		localStorage.removeItem("userRole");
		localStorage.removeItem("username");
		localStorage.removeItem("firstName");
		window.location.href = "./index.html";
	});
}
