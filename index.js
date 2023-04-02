const form = document.querySelector("form");
const errorMessages = document.querySelector("#error-messages");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  errorMessages.innerHTML = "";

  const firstNameInput = document.querySelector("#first-name");
  const lastNameInput = document.querySelector("#last-name");
  const birthdateInput = document.querySelector("#birthdate");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirm-password");
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const birthdate = new Date(birthdateInput.value);
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const errors = [];

  if (firstName.length < 2 || firstName.length > 25) {
    errors.push("Имя должно содержать от 2 до 25 символов");
  }

  if (lastName.length < 2 || lastName.length > 25) {
    errors.push("Фамилия должна содержать от 2 до 25 символов");
  }

  if (birthdate >= new Date()) {
    errors.push("Дата рождения не может быть в будущем");
  }

  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errors.push("Введите валидный адрес электронной почты");
  }

  if (password.length < 8) {
    errors.push("Пароль должен содержать не менее 8 символов");
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("Пароль должен содержать хотя бы 1 символ в верхнем регистре");
  }

  if (!password.match(/[1-9]/)) {
    errors.push("Пароль должен содержать хотя бы 1 цифру");
  }

  if (!password.match(/[!@#\$%\^&]/)) {
    errors.push("Пароль должен содержать 1 специальный символ (!@#$%).");
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    errors.push("Пароль и подтверждение пароля должны совпадать.");
  }

  if (errors.length > 0) {
    event.preventDefault();
    const errorMessage = errors.join("\n");
    alert(errorMessage);
  }
  if (form.checkValidity()) {
    const userData = {
      firstName: form.elements["first-name"].value,
      lastName: form.elements["last-name"].value,
      birthdate: form.elements["birthdate"].value,
      email: form.elements["email"].value,
      password: form.elements["password"].value,
    };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        form.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    const errorMessages = [];
    for (let i = 0; i < form.elements.length; i++) {
      if (!form.elements[i].checkValidity()) {
        errorMessages.push(
          `${form.elements[i].name}: ${form.elements[i].validationMessage}`
        );
      }
    }
    alert(`Ошибка валидации:\n${errorMessages.join("\n")}`);
  }
});
