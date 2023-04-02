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
    errors.push("Name must be between 2 and 25 characters");
  }

  if (lastName.length < 2 || lastName.length > 25) {
    errors.push("Surname must be between 2 and 25 characters");
  }

  if (birthdate >= new Date()) {
    errors.push("Date of birth cannot be in the future");
  }

  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errors.push("Please enter a valid email address");
  }

  if (password.length < 8) {
    errors.push("Password must contain at least 8 characters");
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("Password must contain at least 1 uppercase character");
  }

  if (!password.match(/[1-9]/)) {
    errors.push("Password must contain at least 1 number");
  }

  if (!password.match(/[!@#\$%\^&]/)) {
    errors.push("The password must contain 1 special character (!@#$%)");
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    errors.push("Password and password confirmation must match");
  }

  if (errors.length > 0) {
    event.preventDefault();
    const errorMessage = errors.join("\n");
    alert(errorMessage);
  } else {
    CheckValidation();
  }
});

function CheckValidation() {
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
    alert(`Validation error:\n${errorMessages.join("\n")}`);
  }
}
