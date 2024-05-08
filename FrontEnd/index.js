//Importing a configuration file
import { host, getData, activateButton, deactivateButton } from "./config.js";

//Formation and processing of a request for archaeological projects and their categories
const projects = await getData(host + "works");
const categories = await getData(host + "categories");

//Creating an area with the architect's work
const gallery = document.querySelector(".gallery");
const showAllProjects = () => {
  gallery.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    const figure = document.createElement("figure");
    let figureClass = projects[i].category.name;
    figureClass = figureClass.replace(/ /g, "-");
    figure.classList.add(figureClass);
    figure.classList.add("Tous");
    const img = document.createElement("img");
    img.src = projects[i].imageUrl;
    img.alt = projects[i].title;
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = `${projects[i].title}`;
    figure.append(img, figcaption);
    figure.classList.add(figureClass);
    gallery.appendChild(figure);
  }
};
showAllProjects();

//Creating an area with filters
gallery.insertAdjacentHTML("beforebegin", "<div></div>");
const filters = document.querySelector("#portfolio h2+div");
filters.id = "filters";
const button = document.createElement("button");
button.innerText = "Tous";
button.className = "button";
button.dataset.id = "Tous";
filters.appendChild(button);

for (let i = 0; i < categories.length; i++) {
  const button = document.createElement("button");
  let buttonClass = categories[i].name;
  buttonClass = buttonClass.replace(/ /g, "-");
  button.innerText = `${categories[i].name}`;
  button.className = "button";
  button.dataset.id = buttonClass;
  filters.appendChild(button);
}

//Setting filters
const figures = document.querySelectorAll(".Tous");
const buttons = document.querySelectorAll(".button");
filters.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px; 
`;

buttons.forEach((element, index) => {
  if (index !== 0) {
    deactivateButton(element);
  } else {
    activateButton(element);
  }
});

filters.addEventListener("click", (event) => {
  if (event.target.classList.contains("button")) {
    const targetButton = event.target.dataset.id;
    buttons.forEach((element) => {
      deactivateButton(element);
    });
    activateButton(event.target);

    figures.forEach((element) => {
      if (element.classList.contains(targetButton)) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  }
});
