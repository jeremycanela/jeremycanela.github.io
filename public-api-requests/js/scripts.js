// Search Form Insert
$(".search-container").html(`
	<form action="#" method="get">
		<input type="search" id="search-input" class="search-input" placeholder="Search...">
		<input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
	</form>
`);

// Fetches 12 Users
const employee = new Employees();
employee.importEmployees();

// Search Functionability
$("form").submit((event) => {
	event.preventDefault();
	$("#no-results").remove();
	$(".card").remove();
	const value = $("#search-input").val().toLowerCase();

	searchedEmployees = [];

	$.each(employees, (index, employeeObj) => {
		const employeeName = `${employeeObj.name.first} ${employeeObj.name.last}`;

		if(employeeName.indexOf(value) >= 0 && value !== "") {
			searchedEmployees.push(employeeObj);
			employee.employeeSearch(employeeObj);
		}
	});

	if(value === "" || searchedEmployees.length === 0) {
		$("#gallery").append(`<p id="no-results">No results</p>`);
	}
});