// Keep track of displayed ISBNs to avoid duplicates
const displayedISBNs = new Set();

function getBooks() {
    document.getElementById('output').innerHTML = "";

    // Get the user input and author name
    var userInput = document.getElementById('input').value;
    var authorName = document.getElementById('authorInput').value;

    // Construct the API query URL with both the user input and author name
    var apiUrl = "https://openlibrary.org/search.json?q=" + userInput;
    if (authorName) {
        apiUrl += "+author:" + authorName;
    }

    // Fetch data from the Open Library API based on the modified query
    fetch(apiUrl)
        .then(a => a.json())
        .then(response => {
            for (var i = 0; i < 50; i++) {
                var currentISBN = response.docs[i].isbn[0];

                // Check if ISBN is already displayed, skip if true
                if (displayedISBNs.has(currentISBN)) {
                    continue;
                }

                // Create a container for each item
                var itemContainer = document.createElement('div');
                itemContainer.className = 'item';

                // Display book cover
                var img = document.createElement('img');
                img.src = 'http://covers.openlibrary.org/b/isbn/' + currentISBN + '-M.jpg';
                img.alt = response.docs[i].title;

                // Display book title
                var h2 = document.createElement('h2');
                h2.textContent = response.docs[i].title;

                // Append the image and title to the container
                itemContainer.appendChild(img);
                itemContainer.appendChild(h2);

                // Append the container to the output div
                document.getElementById('output').appendChild(itemContainer);

                // Add the ISBN to the set of displayed ISBNs
                displayedISBNs.add(currentISBN);
            }

            // Adjust the form container height after getting results
            adjustFormHeight();
        });
}

// Set the scroll threshold when to switch from fixed to sticky
const scrollThreshold = 50;

// Add a scroll event listener to handle form scrolling
window.addEventListener('scroll', function() {
    var formContainer = document.querySelector('.form-container');
    var scrolled = window.scrollY;

    // Check if the scroll position has reached the threshold
    if (scrolled >= scrollThreshold) {
        // Switch to position: sticky
        formContainer.style.position = 'sticky';
        formContainer.style.top = '0';
    } else {
        // Switch back to position: fixed
        formContainer.style.position = 'fixed';
        formContainer.style.top = '0';
    }
});

