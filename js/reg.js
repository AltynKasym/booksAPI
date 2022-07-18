const warningText = [
  "имя должен содержать латинские буквы, больше 3 символов",
  "пароль должен содержать латинские буквы и цифры, больше 3 символов",
  "пароли не совпадают",
];
const regForm = document.querySelector(".reg__form");
const inputs = document.querySelectorAll(".input");
const checkInput = document.querySelector(".checkInput");
const regButton = document.querySelector(".reg__form-submit");
const warning = document.querySelectorAll(".reg__form-warning");
const reg = [/^[a-zA-Z_-]{3,21}$/, /^[a-zA-Z0-9_-]{3,21}$/];
const valid = [false, false, false];
// const newUser = {};

// inputs.forEach((input, id) => {
// input.oninput = () => {
// validateInput(input, id);
// };
// });

regForm.addEventListener("submit", function (e) {
  e.preventDefault();
  inputs.forEach((input, id) => {
    validateInput(input, id);
    validatePassword();
  });

  if (valid[0] && valid[1] && valid[2]) {
    registration();
    setTimeout(() => {
      location.assign("./auth.html");
    }, 500);
  } else return;
});

// Валидация формы

function validateInput(input, id) {
  if (reg[id].test(inputs[id].value) !== true) {
    input.classList.add("error");
    warning[id].classList.add("warning-visable");
    warning[id].textContent = warningText[id];
  } else {
    input.classList.remove("error");
    warning[id].textContent = "*";
    warning[id].classList.remove("warning-visable");
    valid[id] = true;
  }
}

function validatePassword() {
  if (checkInput.value.trim() !== "" && inputs[1].value === checkInput.value) {
    checkInput.classList.remove("error");
    warning[2].textContent = "*";
    warning[2].classList.remove("warning-visable");
    valid[2] = true;
  } else {
    checkInput.classList.add("error");
    warning[2].classList.add("warning-visable");
    warning[2].textContent = warningText[2];
  }
}

// Регистрация

function registration() {
  let newUser = {
    username: `${inputs[0].value}`,
    password: `${inputs[1].value}`,
  };
  fetch(`http://localhost:1717/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(newUser),
  }).then((response) => {
    const result = response.json();
    result.then((data) => {
      token = data.token;
      console.log("token", token);
      console.log("data", data);
    });
  });
}
