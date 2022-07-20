const warningText = [
  "логин должен быть на латинице, от 3 до 21 символов",
  "пароль должен быть на латинице, от 3 до 21 символов",
  "имя должна быть на латинице, от 3 до 21 символов",
  "пароли не совпадают",
  "возраст должен быть указан",
];
const regForm = document.querySelector(".reg__form");
const inputs = document.querySelectorAll(".input");
const checkInput = document.querySelector(".checkInput");
const regButton = document.querySelector(".reg__form-submit");
const warning = document.querySelectorAll(".reg__form-warning");
const checkPassword = document.querySelector(".reg__form-checkPassword");
const age = document.querySelector(".age");
const reg = /^[a-zA-Z0-9_-]{3,21}$/;
const valid = [false, false, false, false, false];
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
    validateAge(input, id);
    validatePassword();
  });

  console.log(valid);

  if (valid[0] && valid[1] && valid[2] && valid[3] && valid[4]) {
    registration();
    setTimeout(() => {
      location.assign("./auth.html");
    }, 500);
  } else return;
});

// Валидация формы

function validateInput(input, id) {
  if (reg.test(inputs[id].value) !== true) {
    input.classList.add("error");
    warning[id].classList.add("warning-visable");
    warning[id].textContent = warningText[id];
  } else {
    input.classList.remove("error");
    warning[id].textContent = "*";
    warning[id].classList.remove("warning-visable");
    id === 2 ? (valid[3] = true) : (valid[id] = true);
  }
}

function validateAge() {
  if (age.value == "" && typeof age.value !== "number") {
    age.classList.add("error");
    warning[3].classList.add("warning-visable");
    warning[3].textContent = warningText[4];
  } else {
    age.classList.remove("error");
    warning[3].textContent = "*";
    warning[3].classList.remove("warning-visable");
    valid[4] = true;
  }
}

function validatePassword() {
  if (checkInput.value.trim() !== "" && inputs[1].value === checkInput.value) {
    checkInput.classList.remove("error");
    checkPassword.classList.remove("warning-visable");
    valid[2] = true;
  } else {
    checkInput.classList.add("error");
    checkPassword.classList.add("warning-visable");
    checkPassword.textContent = warningText[3];
  }
}

// Регистрация

function registration() {
  let newUser = {
    username: `${inputs[0].value}`,
    password: `${inputs[1].value}`,
    firstName: `${inputs[2].value}`,
    age: `${age.value}`,
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
