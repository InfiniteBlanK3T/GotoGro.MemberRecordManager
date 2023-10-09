
//importing classes

import { FormValidation } from "./FormValidation.js";
import { feedbackRegEx } from "./RegEx.js";

// declaring html element constants

//inputs

const searchInput = document.getElementById("searchInput");
const MemberIdInput = document.getElementById("memberIdInput");

//textareas

const question_1_textArea = document.getElementById("question_1");
const question_2_textArea = document.getElementById("question_2");
const question_3_textArea = document.getElementById("question_3");

//buttons

const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");

//spans

const searchMemberSpan = document.getElementById("searchMemberSpan");
const q1_span = document.getElementById("q1_span");
const q2_span = document.getElementById("q2_span");
const q3_span = document.getElementById("q3_span");

// declaring class instances

const fv_q1 = new FormValidation(feedbackRegEx);
const fv_q2 = new FormValidation(feedbackRegEx);
const fv_q3 = new FormValidation(feedbackRegEx);

// DataAccessObject

const feedbackObject = {
    memberId: "",
    q1: "",
    q2: "",
    q3: ""
};

const setFeedbackData = () =>{
    feedbackObject.memberId = MemberIdInput.value;
    feedbackObject.q1 = question_1_textArea.value;
    feedbackObject.q2 = question_2_textArea.value;
    feedbackObject.q3 = question_3_textArea.value;
};

let AreInputsAllValid = true;

const formValidationFunc = () => {
	// setting fv_instances
	let areInputsAllValid = true;

	fv_q1.setInput(feedbackObject.q1);
	if (!fv_q1.isInputValid()) {
		q1_span.innerHTML = "Feedback must be between 5 and 66 characters";
		areInputsAllValid = false;
	} else {
		q1_span.innerHTML = "";
	}

	fv_q2.setInput(feedbackObject.q2);
	if (!fv_q2.isInputValid()) {
		q2_span.innerHTML = "Feedback must be between 5 and 66 characters";
		areInputsAllValid = false;
	} else {
		q2_span.innerHTML = "";
	}

    fv_q3.setInput(feedbackObject.q3);
	if (!fv_q3.isInputValid()) {
		q3_span.innerHTML = "Feedback must be between 5 and 66 characters";
		areInputsAllValid = false;
	} else {
		q3_span.innerHTML = "";
	}

	return areInputsAllValid;
};

const onSubmitButtonClickHandler = () => {
	console.log("Submit Button Clicked");

	setFeedbackData()
	console.log("Feedback data: ", feedbackObject);
	AreInputsAllValid = formValidationFunc();

	console.log("Are All Inputs Valid?: ", AreInputsAllValid);

	if (AreInputsAllValid) {

        const sendFeedbackObject = {
            MemberId: feedbackObject.memberId,
            Comment: `Q1: ${feedbackObject.q1} Q2: ${feedbackObject.q2} Q3: ${feedbackObject.q3}`
        }
		// const sendFeedbackObject = feedbackObject;
        console.log("sendFeedbackObject", sendFeedbackObject);


		//BackEnd - fetch from API
		fetch("http://localhost:5732/api/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(sendFeedbackObject),
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

	}

};

submitButton.onclick = onSubmitButtonClickHandler;

const onResetButtonClickHandler = () => {
	console.log("reset button clicked");
	window.location.reload();
}
resetButton.onclick = onResetButtonClickHandler;

//display members while typing

function debounce(func, delay) {
	let debounceTimer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
}

const debouncedSearchMembers = debounce(async function () {
	const input = document.getElementById("searchInput");
	const dropdown = document.getElementById("resultsDropdown");
	const searchTerm = input.value;

	if (searchTerm.length < 1) {
		dropdown.style.display = "none";
		return;
	}

	try {
		const response = await fetch(
			`http://localhost:5732/api/member/search?q=${searchTerm}`
		);
		const members = await response.json();

		dropdown.innerHTML = "";

		if (members.length === 0) {
			searchMemberSpan.innerHTML = "No results found.";
			// dropdown.innerHTML = "<div>No results found</div>";
		} else {
			searchMemberSpan.innerHTML = "";
			
			members.slice(0, 5).forEach((member) => {
				const div = document.createElement("div");
				div.innerHTML = `${member.MemberId}-${member.FirstName} ${member.LastName}`;
				div.onclick = function () {
					// document.getElementById("MemberId").value = member.MemberId; // Fill the MemberId input
                    MemberIdInput.value = member.MemberId;
					input.value = `${member.FirstName} ${member.LastName}`;
					dropdown.style.display = "none"; // Hide dropdown after selection
				};
				dropdown.appendChild(div);
			});
			dropdown.style.display = "block";
		}
	} catch (error) {
		dropdown.innerHTML = "<div>Error fetching results</div>";
		console.error("Error fetching search results:", error);
	}
}, 300); // 300ms delay debounce

//Search Member
function searchMembers() {
	debouncedSearchMembers();
}
document.getElementById("searchInput").addEventListener("keyup", searchMembers);

window.searchMembers = searchMembers;
