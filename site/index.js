function getBooks() {
    document.getElementById('output').innerHTML="";

    // fetching the data from the api according to our input

    fetch("https://openlibrary.org/search.json?q="+document.getElementById('input').value)

    .then(a=>a.json())
    .then(response => {
    for(var i = 0; i < 10; i ++){  // shows 20 top results
        document.getElementById('output').innerHTML+="<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>"+'<h2>'+response.docs[i].title+'</h2>';
    }

    });
}