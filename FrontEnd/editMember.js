document.addEventListener("DOMContentLoaded", async function () {
	const userRole = localStorage.getItem("userRole");
	const accessToken = localStorage.getItem("accessToken");

	if (userRole !== "Manager") {
		alert("You do not have permission to access this page.");
		window.location.href = "./index.html";
		return;
	}

	try {
		const response = await fetch("http://localhost:5732/api/member/", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.ok) {
			const data = await response.json();
			populateMemberTable(data.members);
		} else if (response.status === 403) {
			const data = await response.json();
			alert(`Error: ${data.error}`);
		}
	} catch (error) {
		console.error("There was a problem with the fetch operation:", error);
	}
});

function populateMemberTable(members) {
	const tableBody = document.querySelector("#memberTable tbody");

	members.forEach((member, index) => {
		const row = document.createElement("tr");
		row.id = `row-${index}`;
		row.innerHTML = generateRowHTML(member, index);
		tableBody.appendChild(row);
	});
}

function generateRowHTML(member, index) {
	return `
        <td id="FirstName-${index}">${member.FirstName}</td>
        <td id="LastName-${index}">${member.LastName}</td>
        <td id="Phone-${index}">${member.Phone}</td>
        <td id="Email-${index}">${member.Email}</td>
        <td id="StreetNumber-${index}">${member.StreetNumber}</td>
        <td id="StreetName-${index}">${member.StreetName}</td>
        <td id="Suburb-${index}">${member.Suburb}</td>
        <td id="PostCode-${index}">${member.PostCode}</td>
        <td>
            <button onclick="editMember('${member.MemberId}', ${index})">Edit</button>
            <button onclick="deleteMember('${member.MemberId}')">Delete</button>
        </td>
    `;
}

function editMember(memberId, index) {
	if (window.confirm("Do you want to edit this record?")) {
		const row = document.getElementById(`row-${index}`);
		const keys = [
			"FirstName",
			"LastName",
			"Phone",
			"Email",
			"StreetNumber",
			"StreetName",
			"Suburb",
			"PostCode",
		];

		keys.forEach((key) => {
			const cell = document.getElementById(`${key}-${index}`);
			const value = cell.innerText;
			cell.innerHTML = `<input type="text" id="input-${key}-${index}" value="${value}">`;
		});

		const actionCell = row.lastElementChild;
		actionCell.innerHTML = `<button onclick="saveMember('${memberId}', ${index})">Save</button>`;
	}
}

async function saveMember(memberId, index) {
	if (window.confirm("Confirm the adjustment for editing?")) {
		const accessToken = localStorage.getItem("accessToken");
		const keys = [
			"FirstName",
			"LastName",
			"Phone",
			"Email",
			"StreetNumber",
			"StreetName",
			"Suburb",
			"PostCode",
		];
		const editedData = {};

		keys.forEach((key) => {
			const input = document.getElementById(`input-${key}-${index}`);
			editedData[key] = input.value;
		});

		try {
			const response = await fetch(
				`http://localhost:5732/api/member/${memberId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(editedData),
				}
			);

			if (response.ok) {
				alert("Member edited successfully");
				location.reload();
			} else {
				const data = await response.json();
				alert(`Error: ${data.error}`);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}
}
async function deleteMember(memberId) {
	if (window.confirm("Do you want to delete this record?")) {
		const accessToken = localStorage.getItem("accessToken");
		try {
			const response = await fetch(
				`http://localhost:5732/api/member/${memberId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.ok) {
				alert("Member deleted successfully");
				location.reload();
			} else {
				const data = await response.json();
				alert(`Error: ${data.error}`);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}
}
