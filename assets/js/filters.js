/** @module Filters */

import { host, getData } from "./config.js";

/**Formation and processing of a request for categories*/
const categories = await getData(host + "categories");

/**
 * Creating an area with the architect's work
 */
const showAllProjects = async () => {
  let projects = await getData(host + "works");
  const gallery = document.querySelector(".gallery");
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

/**
 * Creating an area with filters
 */
const filtersFunction = () => {
  if (!localStorage.authorizationSB) {
    const gallery = document.querySelector(".gallery");
    gallery.insertAdjacentHTML("beforebegin", "<div></div>");
    const filters = document.querySelector("#portfolio h2+div");
    filters.id = "filters";
    const buttonTous = document.createElement("button");
    buttonTous.innerText = "Tous";
    buttonTous.className = "button";
    buttonTous.dataset.id = "Tous";
    buttonTous.classList.add("activateButton");
    filters.appendChild(buttonTous);

    for (let i = 0; i < categories.length; i++) {
      const button = document.createElement("button");
      let buttonId = categories[i].name;
      buttonId = buttonId.replace(/ /g, "-");
      button.innerText = `${categories[i].name}`;
      button.className = "button";
      button.dataset.id = buttonId;
      filters.appendChild(button);
    }

    /**Setting filters */
    const buttons = document.querySelectorAll(".button");
    filters.classList.add("filters");

    buttons.forEach((element, index) => {
      if (index !== 0) {
        element.classList.add("deactivateButton");
      }
    });

    filters.addEventListener("click", (event) => {
      if (event.target.classList.contains("button")) {
        const targetButton = event.target.dataset.id;
        buttons.forEach((element) => {
          element.classList.add("deactivateButton");
          element.classList.remove("activateButton");
        });
        event.target.classList.add("activateButton");
        event.target.classList.remove("deactivateButton");

        const figures = document.querySelectorAll(".Tous");
        figures.forEach((element) => {
          if (element.classList.contains(targetButton)) {
            element.style.display = "block";
          } else {
            element.style.display = "none";
          }
        });
      }
    });
  }
};

export { showAllProjects, filtersFunction };
