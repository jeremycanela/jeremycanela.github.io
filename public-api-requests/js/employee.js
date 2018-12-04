// Stores all employees returned
let employees = [];

// Stores all employees that match the search
let searchedEmployees = [];

class Employees {
	constructor() {
		// Stores the total number of employees
		this.employeesCount = 12
	}

	// Inserts a card into the `#gallery` with the provided employee's object
	employeeCard(employee) {
		$("#gallery").append(`
			<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>
		`);
	}

	// Inserts all the employees returned from the API
	importEmployees() {
		$.getJSON(`https://randomuser.me/api/?results=${this.employeesCount}&nat=US`, (data) => {
			const results = data.results;
			$.each(results, (index, employee) => {
				employees.push(employee);
				this.employeeCard(employee);
			});

			this.employeeModal(employees);
		});
	}

	/*	- A click event listener for every card.
		- It takes an array of all the objects of the employees.
		- "Prev" and "Next" buttons' functionability */
	employeeModal(employeeArray) {
		$(".card").click((event) => {
			let employeeIndex = $(event.target).closest(".card").index();
			employee.employeeDetails(employeeIndex, employeeArray);

			if(employeeIndex === 0) {
				$("#modal-prev").attr("disabled", "disabled");
			}

			if(employeeIndex === this.employeesCount - 1 || $(event.target).closest(".card").is(":last-child")) {
				$("#modal-next").attr("disabled", "disabled");
			}

			$("#modal-prev").click((event) => {
				$("#modal-next").removeAttr("disabled");
				employeeIndex = employeeIndex - 1;
				this.modalChange(event, employeeIndex, employeeIndex, employeeArray);
			});

			$("#modal-next").click((event) => {
				$("#modal-prev").removeAttr("disabled");
				employeeIndex = employeeIndex + 1;
				this.modalChange(event, employeeIndex, employeeIndex, employeeArray);
			});
		});
	}

	// Inserts a modal corresponding to the employee
	employeeDetails(employeeIndex, employeeArray) {
		$(".modal-container").remove();
		const employee = employeeArray[employeeIndex];
		const formattedEmployeeDOB = employee.dob.date.replace(/(\d{4})-(\d{2})-(\d{2})(T\d*:\d*:\w*)/g, "$2/$3/$1");
		$("#gallery").after(`
			<div class="modal-container">
	            <div class="modal">
	                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
	                <div class="modal-info-container">
	                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
	                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
	                    <p class="modal-text modal-email">${employee.email}</p>
	                    <p class="modal-text modal-city cap">${employee.location.city}</p>
	                    <hr>
	                    <p class="modal-text modal-phone-number">${employee.phone}</p>
	                    <p class="modal-text cap modal-address">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode} US</p>
	                    <p class="modal-text modal-dob">Birthday: ${formattedEmployeeDOB}</p>
	                </div>
	            </div>

	            
	            <div class="modal-btn-container">
	                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
	                <button type="button" id="modal-next" class="modal-next btn">Next</button>
	            </div>
	        </div>
		`);

		$("#modal-close-btn").click(() => {
			$(".modal-container").remove();
		});
	}

	// Updates the employee's modal with information from the newly selected employee
	updateEmployee(newEmployee) {
		const formattedPrevEmployeeDOB = newEmployee.dob.date.replace(/(\d{4})-(\d{2})-(\d{2})(T\d*:\d*:\w*)/g, "$2/$3/$1");

		$(".modal-img").attr("src", newEmployee.picture.large);
		$(".modal-name").text(`${newEmployee.name.first} ${newEmployee.name.last}`);
		$(".modal-email").text(`${newEmployee.email}`);
		$(".modal-city").text(`${newEmployee.location.city}`);
		$(".modal-phone-number").text(`${newEmployee.phone}`);
		$(".modal-address").text(`${newEmployee.location.street}, ${newEmployee.location.city}, ${newEmployee.location.state} ${newEmployee.location.postcode}`);
		$(".modal-dob").text(`Birthday: ${formattedPrevEmployeeDOB}`);
	}
	
	/*	- Updates the modal based on the button clicked, "Prev" or "Next"
		- event: targets the button clicked
		- modalDirection: an equation to manipulate the employeeIndex
		- employeeIndex: the index at which the employee is located in the employeeArray
		- employeeArray: the employees' array */
	modalChange(event, modalDirection, employeeIndex, employeeArray) {
		employeeIndex = modalDirection;
		if(employeeIndex === 0 || employeeIndex === employeeArray.length - 1) {
			$(event.target).attr("disabled", "disabled");
		}

		const prevEmployee = employeeArray[employeeIndex];
		this.updateEmployee(prevEmployee);
	}

	// Inserts the employees corresponding to the search
	employeeSearch(employee) {
		this.employeeCard(employee);
		this.employeeModal(searchedEmployees);
	}
}