/**@module Authorization */

import { host, apiCall } from "./config.js";

/**
 * Selection and creation of necessary DOM elements
 */
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailMessage = document.getElementById("emailMessage");
const passwordMessage = document.getElementById("passwordMessage");
form.insertAdjacentHTML("beforebegin", "<div></div>");
const errorMessage = document.querySelector("h2+div");
errorMessage.id = "errorMessage";

/**
 * Verifying the validity of fields and sending a request for authentication
 */
form.noValidate = true;
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    if (!email.checkValidity()) {
      email.setCustomValidity("Veuillez saisir un email valide");
      emailMessage.innerText = email.validationMessage;
      email.setCustomValidity("");
      setTimeout(() => (emailMessage.innerText = ""), 3500);
    }

    if (!password.checkValidity()) {
      password.setCustomValidity("Veuillez saisir votre mot de passe");
      passwordMessage.innerText = password.validationMessage;
      password.setCustomValidity("");
      setTimeout(() => (passwordMessage.innerText = ""), 3500);
    }

    return;
  }

  let user = {
    email: `${email.value}`,
    password: `${password.value}`,
  };

  user = JSON.stringify(user);
  let response = await apiCall(host + "users/login", "POST", user);

  if (!response.ok) {
    errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
    setTimeout(() => (errorMessage.innerText = ""), 3500);
    return;
  }

  let result = await response.json();
  localStorage.setItem("authorizationSB", JSON.stringify(result));
  window.location.href = "../index.html";
});
