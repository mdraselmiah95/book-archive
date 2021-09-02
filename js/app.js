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
  //Total search result
  totalResult.innerText = `Total Search Results: ${books.length}`;
  //Error handle
  if (books.length === 0) {
    alert("No result found.");
  }
  showError.innerText = "";
  books.forEach((book) => {
    const bookCover = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
            <div class="card p-2">
                <img src="${
                  bookCover ? bookCover : ""
                }" class="card-img-top img-fluid" alt="country flag" />
                <div class="card-body">
                    <h4 class="card-title fw-bold text-dark">${book.title}</h4>
                    <p class="text-danger fst-italic">${book.author_name}</p>
                    <h5 class="text-secondary">Publisher:<span class="text-dark"> ${
                      book.publisher
                    }</span></h5>
                    <p class="text-secondary">First publish year: <span class="fw-bold fs-4 text-dark">${
                      book.first_publish_year
                    }</span></p>
                </div>
            </div> `;
    bookContainer.appendChild(div);
  });
};
