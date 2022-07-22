// import { setUsername } from "./userboard.js";
// Аутентификация

const authForm = document.querySelector(".auth__form");
const authInputs = document.querySelectorAll(".auth__form-input");
const authWarnings = document.querySelectorAll(".auth__form-warning");
const authWarning = document.querySelector(".auth__warning");
const authWarningText = ["Введите логин", "Введите пароль"];
const authValid = [false, false];

authForm.onsubmit = (e) => {
  e.preventDefault();
  authInputs.forEach((input, id) => {
    if (input.value.trim() == "") {
      authValid[id] = false;
      input.classList.add("error");
      authWarnings[id].classList.add("warning-visable");
      authWarnings[id].textContent = authWarningText[id];
    } else {
      authValid[id] = true;
      input.classList.remove("error");
      authWarnings[id].classList.remove("warning-visable");
    }
  });
  if (authValid[0] && authValid[1] == true) {
    auth();
  } else return;
};

function auth() {
  let authUser = {
    username: `${authInputs[0].value}`,
    password: `${authInputs[1].value}`,
  };
  fetch(`http://localhost:1717/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(authUser),
  }).then((response) => {
    const result = response.json();
    if (response.status === 200) {
      authWarning.classList.remove("warning-visable");
      setTimeout(() => {
        location.assign("./books.html");
      }, 500);
    } else {
      authWarning.classList.add("warning-visable");
    }
    console.log(response);
    result.then((data) => {
      token = data.token;
      user = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user.username);
    });
  });
}
