const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const totalResult = document.getElementById("result");
const showError = document.getElementById("error");


searchBtn.addEventListener("click", function () {
  const searchText = searchInput.value;
  if (searchText === "") {
    showError.innerText = "Search field cannot be empty.";
    return;
    }
    //clear data
    searchInput.value = "";
    bookContainer.innerHTML = "";
    //fetch url
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBooks(data.docs));
});

const displayBooks = (books) => {
    //Error handle
    if (books.length === 0) {
        alert("No result found.")
    }
        showError.innerText = "";
    books.forEach(book => {
        console.log(book.numFound)
        // totalResult.innerText = book.length;
            const bookCover = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
            <div class="card p-2">
                <img src="${bookCover ? bookCover : ''}" class="card-img-top img-fluid" alt="country flag" />
                <div class="card-body">
                    <h3 class="card-title text-success fw-bold">${book.title}</h3>
                    <h4 class="text-secondary fw-bold">${book.author_name}</h4>
                    <h5 class="fw-bold">Publisher: ${book.publisher}</h5>
                    <p class="">First publish year: ${book.first_publish_year}</p>
                </div>
            </div> `;
            bookContainer.appendChild(div)
        });
}