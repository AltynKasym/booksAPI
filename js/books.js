const books = document.querySelector(".books");
const booksList = document.querySelector(".books__list");

books.addEventListener("click", function () {
  let token = localStorage.getItem("token");
  fetch(`http://localhost:1717/books`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": `${token}`,
    },
    // body: JSON.stringify(newUser),
  }).then((response) => {
    const result = response.json();
    result.then((data) => {
      //   token = data.token;
      showBooks(data);
    });
  });
});

function showBooks(books) {
  books.forEach((book) => {
    const li = document.createElement("li");
    li.innerHTML = `<h2>Название книги: ${book.name}</h2>
                    <h3>Автор: ${book.author}</h3>
                    <p>Избранное: ${book.isFavorite ? `Да` : `Нет`}</p>`;
    booksList.append(li);
  });
}
