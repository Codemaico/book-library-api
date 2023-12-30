// Keep track of displayed ISBNs to avoid duplicates
const displayedISBNs = new Set();

// Keep track of the current page
let currentPage = 1;

// Setting the number of results per page
const resultsPerPage = 10;

let apiUrl;

let allResults = [];

// function to get books when enter key is pressed
function handleEnterKey(event) {
  if (event.key === "Enter") {
    getBooks();
  }
}

//add event listener to the input element
const inputElement = document.getElementById("input");
inputElement.addEventListener("keydown", handleEnterKey);

function getBooks() {
  // Get the user input and author name
  const userInput = document.getElementById("input").value;
  const authorName = document.getElementById("authorInput").value;

  // Construct the API query URL with both the user input and author name
  apiUrl = "https://openlibrary.org/search.json?q=" + userInput;
  if (authorName) {
    apiUrl += "+author:" + authorName;
  }

  // Fetch data from the Open Library API based on the modified query
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Add the fetched results to the array
      allResults = data.docs;

      // Display the results
      displayResults();

      // Add pagination if there are more results
      if (currentPage * resultsPerPage < allResults.length) {
        addPaginationButton();
      }
    });
}

function displayResults() {
  console.log("Results:", allResults.length);

  // calculate the start of index for pagination
  const startIndex = (currentPage - 1) * resultsPerPage;

  //get a subset results based on pagination
  const results = allResults.slice(startIndex, startIndex + resultsPerPage);

  // Get the output element
  const outputElement = document.getElementById("output");

  // Clear the output
  outputElement.innerHTML = "";

  // Display each result
  results.forEach((result) => {
    const currentISBN = result.isbn[0];

    // Check if ISBN is already displayed, skip if true
    if (displayedISBNs.has(currentISBN)) {
      return;
    }

    // Create a container for each item
    const itemContainer = document.createElement("div");
    itemContainer.className = "item";

    // Display book cover
    const img = document.createElement("img");
    img.src = "http://covers.openlibrary.org/b/isbn/" + currentISBN + "-M.jpg";
    img.alt = result.title;

    // Display book title
    const h2 = document.createElement("h2");
    h2.textContent = result.title;

    // Append the image and title to the container
    itemContainer.appendChild(img);
    itemContainer.appendChild(h2);

    // Append the container to the output div
    outputElement.appendChild(itemContainer);

    // Add the ISBN to the set of displayed ISBNs
    displayedISBNs.add(currentISBN);
  });
}

function addPaginationButton() {
  // Get the output element
  const outputContainer = document.getElementById("output-container");

  // Create a pagination button
  const paginationButton = document.createElement("button");
  paginationButton.textContent = "Load More";
  paginationButton.classList.add("pagination-button");

  // Attach a click event to load more results
  paginationButton.addEventListener("click", () => {
    currentPage++;
    displayResults();
  });

  // Append the button to the output div
  outputContainer.appendChild(paginationButton);
}

getBooks();

// Set the scroll threshold when to switch from fixed to sticky
const scrollThreshold = 10;

// Add a scroll event listener to handle form scrolling
window.addEventListener("scroll", function () {
  const formContainer = document.querySelector(".form-container");
  const scrolled = window.scrollY;

  // Check if the scroll position has reached the threshold
  if (scrolled >= scrollThreshold) {
    // Switch to position: sticky
    formContainer.style.position = "sticky";
    formContainer.style.top = "0";
  } else {
    // Switch back to position: fixed
    formContainer.style.position = "fixed";
    formContainer.style.top = "0";
  }
});
