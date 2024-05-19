/** @module Modal */

import { showAllProjects } from "./filters.js";
import { apiCall, host, getData } from "./config.js";

/**
 * the function of filling the gallery in the modal window with existing projects
 * @returns {undefined}
 */
const showAllProjectsInModalWindow = async () => {
  let projects = await getData(host + "works");

  const modalPortfolio = document.querySelector(".modalPortfolio");
  modalPortfolio.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    const modalFigure = document.createElement("figure");

    const modalPhoto = document.createElement("img");
    modalPhoto.src = projects[i].imageUrl;
    modalPhoto.alt = projects[i].title;
    modalPhoto.classList.add("modalPhoto");

    modalFigure.appendChild(modalPhoto);
    modalFigure.style.position = "relative";

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btnRemove");

    const imgRemove = document.createElement("img");
    imgRemove.src = "./assets/icons/remove.png";
    btnRemove.appendChild(imgRemove);

    btnRemove.id = projects[i].id;
    modalFigure.appendChild(btnRemove);
    modalPortfolio.appendChild(modalFigure);

    btnRemove.addEventListener("click", async (event) => {
      event.preventDefault();
      let response = await apiCall(host + `works/${btnRemove.id}`, "DELETE");
      if (response.ok) {
        projects = projects.filter((element) => element.id !== btnRemove.id);
        showAllProjects();
        showAllProjectsInModalWindow();
      }
    });
  }
};

/**
 * the function of creating the first page of the modal window
 * @returns {undefined}
 */
const modalWindowFunction = () => {
  if (!localStorage.hasOwnProperty("authorizationSB")) {
    return;
  }

  /**
   * Creating a modal window
   */
  const body = document.querySelector("body");
  const modal = document.createElement("aside");
  modal.classList.add("modal");
  modal.ariaHidden = "true";

  const modaleGallery = document.createElement("div");
  modaleGallery.classList.add("modaleGallery");

  modal.appendChild(modaleGallery);
  body.appendChild(modal);

  /**
   * Conditions for showing and hiding a modal window
   */
  const btnModifier = document.querySelector("#portfolio a");
  btnModifier.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "flex";
    modal.ariaHidden = false;
    modal.ariaModal = true;
  });

  modal.addEventListener("click", () => {
    modal.ariaHidden = true;
    modal.ariaModal = false;
    modal.style.display = "none";
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      modal.ariaHidden = true;
      modal.ariaModal = false;
      modal.style.display = "none";
    }
  });

  modaleGallery.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  /**
   * Gallery styling in a modal window
   */
  const modalHeader = document.createElement("header");
  modalHeader.classList.add("modalHeader");

  const buttonCross = document.createElement("button");
  buttonCross.classList.add("buttonCross");

  const imgCross = document.createElement("img");
  imgCross.src = "./assets/icons/cross.png";

  const buttonFleche = document.createElement("button");
  buttonFleche.classList.add("buttonFleche");

  const imgFleche = document.createElement("img");
  imgFleche.classList.add("imgFleche");
  imgFleche.src = "./assets/icons/fleche.png";

  const modalTitle = document.createElement("h3");
  modalTitle.classList.add("modalTitle");
  modalTitle.innerText = "Galerie photo";

  const modalPortfolio = document.createElement("div");
  modalPortfolio.classList.add("modalPortfolio");

  const btnAjouter = document.createElement("button");
  btnAjouter.classList.add("btnAjouter");
  btnAjouter.innerText = "Ajouter une photo";

  buttonCross.appendChild(imgCross);
  buttonFleche.appendChild(imgFleche);
  buttonFleche.style.display = "none";
  modalHeader.append(buttonFleche, buttonCross);

  modaleGallery.append(modalHeader, modalTitle, modalPortfolio, btnAjouter);

  buttonCross.addEventListener("click", () => {
    modal.ariaHidden = true;
    modal.ariaModal = false;
    modal.style.display = "none";
  });

  showAllProjectsInModalWindow();
};

export { modalWindowFunction, showAllProjectsInModalWindow };
