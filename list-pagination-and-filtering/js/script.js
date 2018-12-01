/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Global Variables
const studentUL = document.querySelector(".student-list");
let studentLI = studentUL.querySelectorAll(".student-item");
const paginationUL = document.createElement("ul");
const page = document.querySelector(".page");
const pageHeader = document.querySelector(".page-header");
let currentPage = 0;
let totalStudents = studentLI.length;
const itemsPerPage = 10;
let pageStartIndex;
let pageEndIndex;
let errorMsgContainer = document.createElement("div");
let errorMsg = document.createElement("p");

// Resets student list indexes to corresponding page
function setIndexes() {
  pageStartIndex = currentPage * itemsPerPage;
  pageEndIndex = pageStartIndex + itemsPerPage - 1;
}

// Hides all the students
function hideAllStudents() {
  for(let i = 0; i < studentLI.length; i++) {
    studentLI[i].style.display = "none";
  }
}

/*  The `showPage` functions takes in the index at which the first
    student should be listed and the index of the last student on the
    displayed list
*/
function showPage(pageStartIndex, pageEndIndex, studentArray, studentArrayLength) {
  errorMsgContainer.innerHTML = "";
  hideAllStudents();
  
  if(pageEndIndex <= studentArrayLength) {
    for(let i = pageStartIndex; i <= pageEndIndex; i++) {
      studentArray[i].style.display = "";
    }
  } else {
    for(let i = pageStartIndex; i < studentArrayLength; i++) {
      studentArray[i].style.display = "";
    }
  }
}

// The `appendLinks` function generates and give page links functionability
function appendLinks(studentArray) {
  paginationUL.innerHTML = "";
  paginationUL.className = "pagination";

  let paginations = Math.ceil(studentArray.length / itemsPerPage);

  // Generates pagination links
  for(let i = 1; i <= paginations; i++) {
    const paginationLI = document.createElement("li");
    const paginationLink = document.createElement("a");

    paginationLink.textContent = i;
    paginationLink.href = "";

    if(i === currentPage + 1) {
      paginationLink.className = "active";
    }

    paginationUL.appendChild(paginationLI);
    paginationLI.appendChild(paginationLink);
  }

  const paginateToLink = paginationUL.querySelectorAll("a");

  // Pagination links functionability
  for(let i = 0; i < paginateToLink.length; i++) {
    paginateToLink[i].addEventListener("click", (event) => {
      event.preventDefault();

      let clickedLink = event.target;
      currentPage = clickedLink.textContent - 1;
      
      setIndexes();

      const activeLink = paginationUL.querySelector(".active");
      activeLink.className = "";

      clickedLink.className = "active";

      showPage(pageStartIndex, pageEndIndex, studentArray, studentArray.length);
    });
  }

  page.appendChild(paginationUL);
}

// The `appendSearchForm` function appends the search form along with its functionability
function appendSearchForm() {
  // Display error message when user is not found
  function displayError() {
    errorMsgContainer.innerHTML = "";
    errorMsg.textContent = "No results were found.";
    errorMsgContainer.appendChild(errorMsg);
    studentUL.appendChild(errorMsgContainer);
  }
  const searchForm = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");

  searchForm.className = "student-search";
  input.type = "text"
  button.textContent = "Search";
  button.type = "submit";

  searchForm.appendChild(input);
  searchForm.appendChild(button);
  
  pageHeader.appendChild(searchForm);

  searchForm.addEventListener("submit", (event) => {
    let searchResults = [];
    event.preventDefault();
    
    const studentSearched = input.value;
    const allStudentNames = studentUL.querySelectorAll("h3");
    const returnedStudentNames = [];

    for(let i = 0; i < totalStudents; i++) {
      returnedStudentNames.push(allStudentNames[i].textContent);

      if(returnedStudentNames[i].search(studentSearched.toLowerCase()) >= 0) {
        searchResults.push(allStudentNames[i].parentNode.parentNode);
      }
    }
    
    // Once a search is executed, the `pageStartIndex` is always set at link 1
    pageStartIndex = 0;
    pageEndIndex = pageStartIndex + itemsPerPage - 1;
    currentPage = 0;
    showPage(pageStartIndex, pageEndIndex, searchResults, searchResults.length);
    appendLinks(searchResults);

    if(searchResults == "") {
      displayError();
    }
  });
}

setIndexes(); // Presets indexes of students list when page is loaded
showPage(pageStartIndex, pageEndIndex, studentLI, totalStudents); // Hides all students and shows students corresponding to the page
appendLinks(studentLI); // Appends pagination links
appendSearchForm(); // Appends search form