document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById("loginForm");

	// Check if the user is already logged in
	const userRole = localStorage.getItem("userRole");
	if (userRole) {
		window.location.href = "menu.html";
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
				window.location.href = "menu.html";
			} else {
				const data = await response.json();
				alert(`Error: ${data.error}`);
			}
		} catch (error) {
			console.error("There was a problem with the fetch operation:", error);
		}
	});
});
