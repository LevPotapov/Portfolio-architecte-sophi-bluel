//Importing a configuration file
import { host, postData } from "../config.js";

//Selection and creation of necessary DOM elements
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailMessage = document.getElementById("emailMessage");
const passwordMessage = document.getElementById("passwordMessage");
form.insertAdjacentHTML("beforebegin", "<div></div>");
const errorMessage = document.querySelector("h2+div");

//Styling of DOM elements
emailMessage.style.cssText = `
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  text-decoration: none;
`;

passwordMessage.style.cssText = `
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  text-decoration: none;
`;

errorMessage.style.cssText = `
  color: red;
  ont-size: 16px;
  text-align: center;
  margin-top: 30px;
`;

//Verifying the validity of fields and sending a request for authentication
form.noValidate = true;
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    let user = {
      email: `${email.value}`,
      password: `${password.value}`,
    };
    user = JSON.stringify(user);
    let response = await postData(host + "users/login", user);
    if (response.ok) {
      let result = await response.json();
      sessionStorage.setItem("authorization", JSON.stringify(result));
      window.location.href = "../index.html";
    } else {
      errorMessage.innerText = "login ou mot de passe ne sont pas correctes";
      setTimeout(() => (errorMessage.innerText = ""), 3500);
    }
  } else {
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
  }
});
