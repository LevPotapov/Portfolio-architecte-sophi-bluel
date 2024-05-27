/**@module ModalAddPhotos */

import { showAllProjectsInModalWindow } from "./modal.js";
import { host, getData, apiCall } from "./config.js";
import { showAllProjects } from "./filters.js";

/**
 * the function of displaying the second page of the modal window (the page for adding new works)
 * @returns {undefined}
 */
const modalAddPhotos = () => {
  if (!localStorage.hasOwnProperty("authorizationSB")) {
    return;
  }

  /**
   * Selecting and creating the necessary nodes
   */
  const btnAjouter = document.querySelector(".btnAjouter");
  const modalHeader = document.querySelector(".modalHeader");
  const modalTitle = document.querySelector(".modalTitle");
  const modalBody = document.querySelector(".modalPortfolio");
  const modaleAdding = document.querySelector(".modaleGallery");
  modalTitle.insertAdjacentHTML(
    "beforebegin",
    "<p class = 'errorMessage' ></ p>"
  );
  const errorMessage = document.querySelector(".errorMessage");
  const btnValider = document.createElement("button");
  btnValider.classList.add("btnValider");

  /**
   * The function of changing the modal window when clicking the add photo button
   */
  btnAjouter.addEventListener("click", async (event) => {
    event.preventDefault();

    /**Adding a pointer "back"*/
    const buttonFleche = document.querySelector(".buttonFleche");
    buttonFleche.style.display = "block";
    modalHeader.style.justifyContent = "space-between";

    /**Changing the button and title*/
    modalTitle.innerText = "Ajout photo";

    btnAjouter.style.display = "none";

    const btnValider = document.createElement("button");
    btnValider.classList.add("btnValider");
    btnValider.innerText = "Valider";
    btnValider.disabled = true;

    modaleAdding.appendChild(btnValider);

    /**
     * The function of returning to the previous window
     */
    const previousWindow = () => {
      buttonFleche.style.display = "none";
      modalHeader.style.justifyContent = "end";
      btnValider.remove();
      errorMessage.remove();
      btnAjouter.style.display = "block";
      modalTitle.innerText = "Galerie photo";
      modalBody.style.display = "grid";
      modalHeader.style.justifyContent = "end";
      showAllProjectsInModalWindow();
      showAllProjects();
    };

    /**
     * Replacing the portfolio with a form for adding photos
     */
    modalBody.innerHTML = "";

    const formAddingPhoto = document.createElement("form");
    formAddingPhoto.id = "formAddingPhoto";
    formAddingPhoto.classList.add("formAddingPhoto");
    formAddingPhoto.name = "formAddingPhoto";
    modalBody.style.display = "block";
    modalBody.appendChild(formAddingPhoto);

    /**
     * Adding a file
     */
    const fileContainer = document.createElement("div");
    fileContainer.classList.add("fileContainer");

    const preview = document.createElement("img");
    preview.classList.add("fileImg");
    preview.src = "./assets/icons/default photo.png";

    const fileParagraph = document.createElement("p");
    fileParagraph.innerText = "jpg, png : 4mo max";
    fileParagraph.classList.add("fileParagraph");

    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.id = "inputFile";
    inputFile.name = "image";
    inputFile.accept = "image/jpg, image/png";
    inputFile.style.display = "none";

    const labelFile = document.createElement("label");
    labelFile.classList.add("labelFile");
    labelFile.innerText = "+ Ajouter photo";

    labelFile.appendChild(inputFile);
    fileContainer.append(preview, labelFile, fileParagraph);

    /**
     * The title for the added photo
     */
    const inputTextContainer = document.createElement("div");
    inputTextContainer.classList.add("inputTextContainer");

    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.id = "inputText";
    inputText.name = "title";

    const labelInpText = document.createElement("label");
    labelInpText.innerText = "Titre";
    labelInpText.for = "inputText";
    labelInpText.classList.add("modalLabel");

    inputTextContainer.append(labelInpText, inputText);

    /**
     * Category selection field
     */
    const selectContainer = document.createElement("div");
    selectContainer.classList.add("selectContainer");

    const select = document.createElement("select");
    select.id = "select";
    select.name = "category";

    const labelSelect = document.createElement("label");
    labelSelect.innerText = "Catégorie";
    labelSelect.for = "select";
    labelSelect.classList.add("modalLabel");

    const optionDefault = document.createElement("option");
    optionDefault.value = "";
    optionDefault.selected = true;
    optionDefault.disabled = true;
    optionDefault.hidden = true;

    select.appendChild(optionDefault);

    const categories = await getData(host + "categories");
    for (let i = 0; i < categories.length; i++) {
      const option = document.createElement("option");
      option.value = categories[i].id;
      option.innerText = categories[i].name;
      select.appendChild(option);
    }

    selectContainer.append(labelSelect, select);

    formAddingPhoto.append(fileContainer, inputTextContainer, selectContainer);
    btnValider.setAttribute("form", "formAddingPhoto");

    /**
     * The function of returning from the mode of adding photos back to the gallery
     */
    buttonFleche.addEventListener("click", () => {
      previousWindow();
    });

    /**
     * The function of displaying the added photo and checking the format and size of the downloaded file
     */
    inputFile.addEventListener("change", (event) => {
      if (!event.target.files.length) {
        return;
      }

      if (event.target.files[0].size > 4194304) {
        event.target.value = "";
        alert(
          "La taille du fichier est dépassée, sélectionnez un fichier ne dépassant pas 4 MO."
        );
        return;
      }

      if (
        event.target.files[0].type !== "image/jpg" &&
        event.target.files[0].type !== "image/png"
      ) {
        event.target.value = "";
        alert("Sélectionnez le format de fichier approprié.");
        return;
      }

      preview.classList.add("bigPreview");
      fileParagraph.style.display = "none";
      labelFile.style.display = "none";
      preview.src = window.URL.createObjectURL(event.target.files[0]);
    });

    /**
     * Sending a new photo to the server
     */

    /**
     * The send button becomes active
     */
    formAddingPhoto.addEventListener("change", () => {
      if (select.value && inputFile.value && inputText.value) {
        btnValider.disabled = false;
        return;
      }
      errorMessage.innerText = "Remplissez tous les champs";
      setTimeout(() => (errorMessage.innerText = ""), 3500);
      btnValider.disabled = true;
    });

    /**
     * Processing the form submission
     */
    formAddingPhoto.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!select.value && !inputFile.value && !inputText.value) {
        return;
      }
      let response = await apiCall(
        host + "works",
        "POST",
        new FormData(formAddingPhoto)
      );
      if (response.ok) {
        previousWindow();
      } else {
        errorMessage.innerText =
          "Une erreur s'est produite, veuillez vérifier que les données envoyées sont correctes";
      }
    });
  });
};

export { modalAddPhotos };
