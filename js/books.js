const books = document.querySelector(".books-title");
const booksList = document.querySelector(".books__list");
const bookInfo = document.querySelector(".bookInfo");
const closeButton = document.querySelector(".bookInfo-closeButton");
const editButton = document.querySelector(".bookInfo__edit");
const editWindow = document.querySelector(".edit");
const editCloseButton = document.querySelector(".edit-closeButton");

const message = document.querySelector(".books__message");
const userboard = document.querySelector(".userboard");
const logout = document.querySelector(".userboard-logout");
let token = localStorage.getItem("token");

getBooks();

logout.addEventListener("click", userExit);

function userExit() {
  localStorage.setItem("token", null);
  setTimeout(() => {
    location.assign("./auth.html");
  }, 100);
}

function getBooks() {
  while (booksList.firstChild) {
    booksList.removeChild(booksList.firstChild);
  }

  fetch(`http://localhost:1717/books`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": `${token}`,
    },
  }).then((response) => {
    const result = response.json();
    if (response.status !== 200 || token == null || token == "undefined") {
      message.classList.add("books__message-visable");
      userboard.classList.add("userboard-hide");
    } else {
      result.then((data) => {
        if (data == "") {
          message.textContent = "Пока книг нету.";
        } else showBooks(data);
      });
      userboard.classList.remove("userboard-hide");
      message.classList.remove("books__message-visable");
    }
  });
}

function showBooks(books) {
  books.forEach((book) => {
    createCard(book);
  });
}

function createCard(book) {
  const li = document.createElement("li");
  li.setAttribute("class", "books__list-item");
  const title = document.createElement("h2");
  const p = document.createElement("p");
  title.innerHTML = `${book.name}`;
  p.innerHTML = `${book.author}`;
  const booksInfo = document.createElement("div");
  booksInfo.setAttribute("class", "books__list-info");
  booksInfo.append(title, p);

  const control = document.createElement("div");
  const favoriteButton = document.createElement("div");
  const deleteButton = document.createElement("div");
  favoriteButton.innerHTML = `<svg class = 'favorite' width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.3762 2.5401C18.5386 0.825205 16.1258 -0.577889 13.3191 0.239024C11.9779 0.625491 10.8078 1.45428 9.99986 2.58999C9.19192 1.45428 8.02178 0.625491 6.68062 0.239024C3.86771 -0.565417 1.46111 0.825205 0.623483 2.5401C-0.55169 4.94095 -0.0641182 7.64113 2.0737 10.5658C3.74894 12.8544 6.14304 15.1742 9.61856 17.8681C9.72839 17.9536 9.86369 18 10.003 18C10.1423 18 10.2776 17.9536 10.3874 17.8681C13.8567 15.1804 16.257 12.8793 17.9323 10.5658C20.0638 7.64113 20.5514 4.94095 19.3762 2.5401Z" 
${book.isFavorite ? `fill="#a60112"` : `fill = "#B1B1B1"`}  />
</svg>`;

  deleteButton.innerHTML = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.1667 3.6H15.8333V1.6C15.8333 0.7175 15.0859 0 14.1667 0H5.83333C4.91406 0 4.16667 0.7175 4.16667 1.6V3.6H0.833333C0.372396 3.6 0 3.9575 0 4.4V5.2C0 5.31 0.09375 5.4 0.208333 5.4H1.78125L2.42448 18.475C2.46615 19.3275 3.20052 20 4.08854 20H15.9115C16.8021 20 17.5339 19.33 17.5755 18.475L18.2187 5.4H19.7917C19.9062 5.4 20 5.31 20 5.2V4.4C20 3.9575 19.6276 3.6 19.1667 3.6ZM13.9583 3.6H6.04167V1.8H13.9583V3.6Z" fill="#B1B1B1"/>
      </svg>
`;

  control.append(favoriteButton, deleteButton);
  control.setAttribute("class", "books__list-control");
  li.append(booksInfo, control);
  booksList.append(li);

  booksInfo.addEventListener("click", () => showBookDetails(book));
  closeButton.addEventListener("click", () => {
    bookInfo.classList.remove("bookInfo-visable");
  });

  favoriteButton.addEventListener("click", () => {
    changeFavStatus(book);
  });

  deleteButton.addEventListener("click", () => {
    deleteBook(book);
  });
}

let bookData;

function showBookDetails(book) {
  openWindow(bookInfo, "bookInfo-visable");
  fetch(`http://localhost:1717/books/${book.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": `${token}`,
    },
  }).then((response) => {
    const result = response.json();
    result.then((data) => {
      getBookDetails(data);
      bookData = data;
    });
  });
}

const bookTitle = document.querySelector(".bookInfo-title");
const author = document.querySelector(".bookInfo-author");
const pubHouse = document.querySelector(".bookInfo__details-publishHouse");
const lang = document.querySelector(".bookInfo__details-language");
const pubYear = document.querySelector(".bookInfo__details-publishYear");
const pageAmount = document.querySelector(".bookInfo__details-pageAmount");
const genre = document.querySelector(".bookInfo__details-genres");
const editInputs = document.querySelectorAll(".edit__form-input");

function getBookDetails(books) {
  bookTitle.textContent = `${books.name}`;
  author.textContent = `${books.author}`;
  pubHouse.textContent = `Издательство: ${books.publishHouse}`;
  lang.textContent = `Язык оригинала: ${books.originalLanguage}`;
  pubYear.textContent = `Год издания: ${books.publishYear}`;
  pageAmount.textContent = `Количество страниц: ${books.pagesNumber}`;
  genre.textContent = `Жанры: ${books.genres}`;
}

function openWindow(window, className) {
  window.classList.add(className);
}

editButton.addEventListener("click", () => {
  edit = true;
  editBook(bookData);
});
editCloseButton.addEventListener("click", () => {
  editWindow.classList.remove("edit-visable");
});

const addBookButton = document.querySelector(".userboard-addBook");
const formTitle = document.querySelector(".edit-title");
const sendBookButton = document.querySelector(".edit__form-sendButton");
let edit = true;

addBookButton.addEventListener("click", addBook);

function addBook() {
  edit = false;
  editBook(bookData);
}

function editBook(bookData) {
  openWindow(editWindow, "edit-visable");

  if (edit) {
    formTitle.textContent = "Редактировать книгу";
    sendBookButton.value = "Сохранить";
    editInputs.forEach((input) => {
      if (input.type === "radio") {
        input.value === String(bookData.isFavorite)
          ? (input.checked = true)
          : (input.checked = false);
      } else {
        input.value = bookData[input.name];
      }
    });
  } else {
    formTitle.textContent = "Добавить книгу";
    sendBookButton.value = "Добавить";
    editInputs.forEach((input) => {
      if (input.type === "radio") {
        return;
      } else {
        input.value = "";
      }
    });
  }
}

const editForm = document.querySelector(".edit__form");
const editFormWarning = document.querySelectorAll(".edit__form-warning");
const required = document.querySelectorAll(".required");
const formValid = [false, false];

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  required.forEach((item, id) => {
    if (item.value.trim() === "") {
      editFormWarning[id].classList.add("edit__form-warning-visable");
      formValid[id] = false;
    } else {
      editFormWarning[id].classList.remove("edit__form-warning-visable");
      formValid[id] = true;
    }
  });

  if (formValid[0] === true && formValid[1] === true) {
    if (edit) {
      sendEditedBook(e);
    } else {
      sendNewBook(e);
    }
  } else return;
});

const newBook = {};

function sendNewBook(e) {
  e.preventDefault();
  editInputs.forEach((input) => {
    if (input.type === "number") {
      newBook[input.name] = Number(`${input.value}`);
    } else if (input.type === "radio") {
      if (input.checked) {
        newBook.isFavorite = Boolean(Number(input.id));
      } else return;
    } else if (input.name === "genres") {
      newBook[input.name] = [`${input.value}`];
    } else {
      newBook[input.name] = `${input.value}`;
    }
  });

  fetch(`http://localhost:1717/books/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": `${token}`,
    },
    body: JSON.stringify(newBook),
  });

  document.location.reload();
}

let editedBookInfo = {};
function sendEditedBook(e) {
  e.preventDefault();
  editInputs.forEach((input) => {
    if (input.type === "number") {
      editedBookInfo[input.name] = Number(`${input.value}`);
    } else if (input.type === "radio") {
      if (input.checked) {
        editedBookInfo.isFavorite = Boolean(Number(input.id));
      } else return;
    } else if (input.name === "genres") {
      editedBookInfo[input.name] = [`${input.value}`];
    } else {
      editedBookInfo[input.name] = `${input.value}`;
    }
  });

  fetch(`http://localhost:1717/books/update/${bookData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": `${token}`,
    },
    body: JSON.stringify(editedBookInfo),
  });

  document.location.reload();
}

function changeFavStatus(book) {
  fetch(`http://localhost:1717/books/update/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": `${token}`,
    },
    body: JSON.stringify({ isFavorite: !book.isFavorite }),
  });
  setTimeout(() => {
    getBooks();
  }, 200);
}

function deleteBook(book) {
  fetch(`http://localhost:1717/books/delete/${book.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": `${token}`,
    },
  });
  setTimeout(() => {
    getBooks();
  }, 500);
}
