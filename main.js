document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById("loginForm");
	const navbar = document.getElementById("navbar");

	// Check if the user is already logged in
	const userRole = localStorage.getItem("userRole");
	const username = localStorage.getItem("username");
	const firstName = localStorage.getItem("firstName");
	if (userRole) {
		showLinksBasedOnRole(userRole, username, firstName);
	}

	loginForm.addEventListener("submit", async function (e) {
		e.preventDefault();
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		try {
			const response = await fetch("http://localhost:5732/api/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ Username: username, Password: password }),
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("userRole", data.user.Role);
				localStorage.setItem("username", data.user.Username);
				localStorage.setItem("firstName", data.user.FirstName);
				showLinksBasedOnRole(data.user.Role, data.user.Username);
				window.location.href = "menu.html";
			} else {
				const data = await response.json();
				alert(`Error: ${data.error}`);
			}
		} catch (error) {
			console.error("There was a problem with the fetch operation:", error);
		}
	});

	function showLinksBasedOnRole(role, firstName) {
		let links = "";
		if (role === "Employee") {
			links = `
                <a href="FrontEnd/AddMember.html">Add Member</a>
                <a href="FrontEnd/AddSalesRecord.html">Add Sales</a>
                <a href="FrontEnd/Feedback.html">Feedback</a>
            `;
		} else if (role === "Manager") {
			links = `
                <a href="FrontEnd/AddMember.html">Add Member</a>
                <a href="FrontEnd/EditMember.html">Edit Member</a>
                <a href="FrontEnd/AddSalesRecord.html">Add Sales</a>
                <a href="FrontEnd/EditSalesRecord.html">Edit Sales</a>
                <a href="FrontEnd/DownloadCSV.html">Generate CSV</a>
                <a href="FrontEnd/AddEmployee.html">Add Employee</a>
                <a href="FrontEnd/Feedback.html">Feedback</a>
            `;
		}

		const greeting = `Hello, ${firstName}! | ${role} `;
		navbar.innerHTML = greeting + links + '<a href="#" id="logout">Logout</a>';

		document.getElementById("logout").addEventListener("click", function () {
			localStorage.removeItem("userRole");
			localStorage.removeItem("username");
			localStorage.removeItem("firstName");
			window.location.href = "index.html";
		});
	}
});
