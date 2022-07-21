export function httpRequest(url, method, token) {
  fetch(`http://localhost:1717/books/${book.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": `${token}`,
    },
    // body: (book.isFavorite = !book.isFavorite),
  }).then((response) => {
    const result = response.json();
    result.then((data) => {
      getBookDetails(data);
      bookData = data;
    });
  });
}
