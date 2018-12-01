// Global Variables
const $name = $("#name");
const $mail = $("#mail");
const $title = $("#title");
const $other = $("#other-title");
const $design = $("#design");
const $color = $("#color");
const $activities = $(".activities");
const hiddenActivitiesIndexes = [];
const cost = [];
const $payment = $(".payment");
const $creditCard = $("#cc-num");
const $zip = $("#zip");
const $cvv = $("#cvv");

// Executes errors on input fields
const alertError = (input, errorMessage) => {
	input.before(`<span class="error-message">${errorMessage}</span>`);
	input.css("border", "2px solid #b33939");
}

// Removes errors and sets input fields to its default state
const removeError = (input) => {
	input.prev("span.error-message").remove();
	input.css("border", "inherit");
}

// Checks if an input value is empty and prints an error if so to the user
const emptyCheck = (inputValue, inputSelector, errorMessage) => {
	if(inputValue == "") {
		removeError(inputSelector);
		alertError(inputSelector, errorMessage);
		return 0;
	} else {
		removeError(inputSelector);
	}
}

// Check if an input value is invalid and prints an error if so to the user
const validate = (validationBoolean, inputSelector, errorMessage) => {
	if(validationBoolean === false) {
		removeError(inputSelector);
		alertError(inputSelector, errorMessage);
	} else {
		removeError(inputSelector);
	}
}

// Executes a full input field check and prints out either an empty or invalid input field error to the user
const errorCheck = (inputSelector, regularExpression, emptyError, invalidError) => {
	const validateInput = () => {
		const value = inputSelector.val();
		const validated = regularExpression.test(value);

		if(emptyCheck(value, inputSelector, emptyError) !== 0) {
			validate(validated, inputSelector, invalidError);
		}
	}

	// Real time validation
	inputSelector.on("keydown blur keyup", () => {
		validateInput();
	});

	// Validation after submission
	$("button[type=submit]").click(() => {
		validateInput();
		/*	Since the "other" job role input field is optional, it is also validated upon submission and 
			it removes any errors from the input field if it was previously selected */
		validateOther();
	});
}

// Validates the name field
const validateName = () => {
	errorCheck($name, /^[A-Za-z ]+$/, "Sorry! I we didn't catch your name (or did you ever throw it hmm...).", "Sorry! Unless you're a robot we need a valid name.");
}

// Validates the email field
const validateMail = () => {
	errorCheck($mail, /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Sorry! We hate spam too, we won't send you any. Please provide an email.", "Sorry! We don't want to send an order confirmation email to johndoe@fake.com. Please input a valid email.");
}

// Validates the "other" input value
const validateOther = () => {
	const optionSelected = $title.find("option:selected");
	if(optionSelected.attr("value") == "other") {
		errorCheck($other, /^[A-Za-z ]+$/, "Sorry! Should we assume you're an upcoming hip-hop artist? Please input a job role.", "Sorry! We're sure all job titles only contain letters. Please input a valid job role.");
	} else {
		// The errors on the "other" input field are removed if a user selects "Other", and reselects another job role afterwards
		$(".basic_info #other-title").prev(".error-message").remove();
	}
}

// Imports an input field if "other" is selected in the job role selection
const importOtherJobRoleInput = () => {
	// Removes the "Other" input field
	const removeInput = () => {
		$("label[for=other-title]").next(".error-message").remove();
		$("label[for=other-title]").hide();
		$("input#other-title").hide();
	}

	// Removes the "other" input field on page load
	removeInput();

	$title.change(() => {
		// Removes the "other" input field on every selection change
		removeInput();

		if($title.find("option:selected").attr("value") == "other") {
			$("input#other-title").css("border", "");
			$("label[for=other-title]").show();
			$("input#other-title").show();
			validateOther();
		}
	});
}



// Hides and filters the color selector in the "Shirt Info" section
const themeFilter = () => {
	$("#colors-js-puns").hide();
	$design.find("option").first().attr("disabled", "disabled");
	$design.on("change", (event) => {
		$(".shirt .error-message").remove();
		const selectedDesign = $design.find("option:selected").text();

		const filterColors = (hiddenTheme, shownTheme) => {
			$color.children().show();
			$color.find(`option:contains(${hiddenTheme})`).hide();
			$color.children().removeAttr("selected");
			$color.find(`option:contains(${shownTheme})`).first().attr("selected", "selected");
		}

		if(selectedDesign == "Select Theme") {
			$color.children().show();
			$("#color option").removeAttr("selected");
			$("#color option").first().attr("selected", "selected");
		} else if(selectedDesign == "Theme - JS Puns") {
			$("#colors-js-puns").show();
			filterColors('I ♥ JS', 'JS Puns');
		} else if(selectedDesign == "Theme - I ♥ JS") {
			$("#colors-js-puns").show();
			filterColors('JS Puns', 'I ♥ JS');
		}
	});
}

/*	- Filters the "Register for Activities" section to prevent from selecting two activities being held at the same day and time
	- Sums up the total for all the selected activities */
const activitiesFilter = () => {
	$activities.find("label input").change((event) => {
		$activities.find(".error-message").remove();
		let regex = /^[a-zA-Z. ]+ — ([a-zA-z$]+ ?\d+\w+-?\d+\w?\w?),? ?[$]?(\d?\d?\d?)$/;
		const times = [];
		let selectedTime;
		let activityIndex;
		let activityCost;

		const datelessActivityFormat = () => {
			regex = /[A-Za-z ]+—\s\$(\d+)/;
			activityCost = selectedEventTime.replace(regex, "$1");
		}

		$.each($activities.find("label"), (i, val) => {
			const event = val.textContent;
			const eventTime = event.replace(regex, "$1");
			if(event.match(/\w+[-]\w+/)) {
				times.push(eventTime);
			} else {
				times.push("");
			}
		});

		const selectedEventTime = $(event.target).parent().text();
		if(selectedEventTime) {
			selectedTime = selectedEventTime.replace(regex, "$1");
			activityCost = selectedEventTime.replace(regex, "$2");
			
			if(!activityCost && event.target.checked) {
				datelessActivityFormat();
				cost.push(activityCost);
			} else if(event.target.checked) {
				cost.push(activityCost);
			} else if(!activityCost && event.target.checked === false) {
				datelessActivityFormat();
				const costIndex = cost.indexOf(activityCost);
				cost.splice(costIndex, 1);
			} else {
				const costIndex = cost.indexOf(activityCost);
				cost.splice(costIndex, 1);
			}

			$.each(times, (i, val) => {
				if(selectedTime == times[i]) {
						$activities.find(`label:eq(${i})`).removeClass("disabled");
						$activities.find(`label:eq(${i})`).find("input").removeAttr("checked");
						$activities.find(`label:eq(${i})`).find("input").removeAttr("disabled");

					if(hiddenActivitiesIndexes.includes(i)) {
						activityIndex = hiddenActivitiesIndexes.indexOf(i);
						hiddenActivitiesIndexes.splice(activityIndex, 1);
					}

					if(event.target.checked) {
						hiddenActivitiesIndexes.push(i);
						$(event.target).attr("checked", "checked");
						$activities.find(`label:eq(${i})`).not(event.target.parentNode).addClass("disabled").find("input").attr("disabled", "disabled");
					}
				}
			});

			let totalCost = 0;

			$.each(cost, (i, val) => {
				totalCost = totalCost + parseInt(cost[i]);
			});

			$activities.find("#total").remove();
			if(totalCost > 0) {
				$activities.append(`<p id="total">Total: $${totalCost}</p>`);
			}
		}
	});
}

// Shows the payment method section corresponding to the selected payment method
function paymentMethod() {
	$("#paypal, #bitcoin").hide();
	$payment.find("#payment option[value=credit_card]").attr("selected", "selected");
	$payment.find("#payment").click(() => {
		$("option[value=select_method]").attr("disabled", "disabled");
	});

	$payment.find("#payment").change((event) => {
		$payment.find(".error-message").remove();
		$payment.find("#payment option:selected").removeAttr("selected");
		const selectedMethod = $(event.target).find("option:selected");

		if(selectedMethod.attr("value") == "credit_card") {
			validateCreditCard();
			$creditCard.css("border", "");
			$zip.css("border", "");
			$cvv.css("border", "");
			$("#credit-card").show();
			$("#paypal, #bitcoin").hide();
		} else if(selectedMethod.attr("value") == "paypal") {
			$("#paypal").show();
			$("#credit-card, #bitcoin").hide();
		} else if(selectedMethod.attr("value") == "bitcoin") {
			$("#bitcoin").show();
			$("#credit-card, #paypal").hide();
		}
	});
}

// Validates the credit card along with the zip code and cvv
const validateCreditCard = () => {
	if($payment.find("#payment option[value=credit_card]").attr("selected") == "selected") {
		errorCheck($creditCard, /^\d{13,16}$/, "Sorry! We can't sell t-shirts for free. Please enter a card number.", "Sorry! Who do you think you're fooling? The credit card provided is invalid.");
		errorCheck($zip, /^\d{5}$/, "Sorry! We promise your zip code will remain secure. Please input a zip code.", "Sorry! You might want to search up your zip code, we don't like the one you provided. Please input a valid zip code.");
		errorCheck($cvv, /^\d{3}$/, "Sorry! Providing the CVV would be useful. Pleave input a CVV.", "Sorry! Check the back of your card buddy. The CVV is invalid.");
	}
}

// Prints an error to the user after the `legend` element once the function is executed
const selectorError = (selector, errorMessage) => {
	selector.find(".error-message").remove();
	selector.find("legend").after(`<span class="error-message">${errorMessage}</span>`);
}

// On page load, execute the following functions for real time validation
validateName();
validateMail();
importOtherJobRoleInput();
themeFilter();
activitiesFilter();
paymentMethod();
validateCreditCard();

$("form").submit((event) => {
	if(cost.length == 0) {
		selectorError($activities, "Sorry! We need you to never stop learning, please select an activity.");
	}

	if(!$payment.find("#payment option[value=credit_card]").prop("selected")) {
		$payment.find(".error-message").remove();
	}

	/*	- If there are any errors, prevent from submitting
		- Checks if the "other" (optional input) is selected, and if so it checks if it is valid */
	if($(".error-message").length > 0) {
		event.preventDefault();
	}
});