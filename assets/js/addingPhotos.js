import { showAllProjectsInModalWindow } from "./modal.js";
import { host, postData } from "./config.js";
import { showAllProjects } from "./filters.js";

const functionAddingPhotos = () => {
  if (!localStorage.hasOwnProperty("authorizationSB")) {
    return;
  }

  const btnAjouter = document.querySelector(".btnAjouter");
  const modalHeader = document.querySelector(".modalHeader");
  const modalTitle = document.querySelector(".modalTitle");
  const modalBody = document.querySelector(".modalPortfolio");
  const modaleAdding = document.querySelector(".modaleGallery");

  //The function of changing the modal window when clicking the add photo button
  btnAjouter.addEventListener("click", (event) => {
    event.preventDefault();

    //Adding a pointer "back"
    modalHeader.insertAdjacentHTML(
      "afterbegin",
      "<button class = 'buttonFleche' ></ button>"
    );
    const buttonFleche = document.querySelector(".buttonFleche");
    buttonFleche.classList.add("buttonFleche");

    const imgFleche = document.createElement("img");
    imgFleche.classList.add("imgFleche");
    imgFleche.src = "./assets/icons/fleche.png";

    buttonFleche.appendChild(imgFleche);
    modalHeader.style.justifyContent = "space-between";

    //Changing the button and title
    modalTitle.innerText = "Ajout photo";

    btnAjouter.style.display = "none";

    const btnValider = document.createElement("button");
    btnValider.classList.add("btnValider");
    btnValider.innerText = "Valider";
    btnValider.disabled = true;

    modaleAdding.appendChild(btnValider);

    //Replacing the portfolio with a form for adding photos
    modalBody.innerHTML = "";

    const formAddingPhoto = document.createElement("form");
    formAddingPhoto.id = "formAddingPhoto";
    formAddingPhoto.classList.add("formAddingPhoto");
    formAddingPhoto.name = "formAddingPhoto";
    modalBody.style.display = "block";
    modalBody.appendChild(formAddingPhoto);

    //Adding a file
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

    //The title for the added photo
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

    //Category selection field
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

    const optionObjets = document.createElement("option");
    optionObjets.value = 1;
    optionObjets.innerText = "Objets";
    const optionAppartements = document.createElement("option");
    optionAppartements.value = 2;
    optionAppartements.innerText = "Appartements";
    const optionHotelsRestaurants = document.createElement("option");
    optionHotelsRestaurants.value = 3;
    optionHotelsRestaurants.innerText = "Hotels & Restaurants";

    select.append(
      optionDefault,
      optionObjets,
      optionAppartements,
      optionHotelsRestaurants
    );

    selectContainer.append(labelSelect, select);

    formAddingPhoto.append(fileContainer, inputTextContainer, selectContainer);

    //The function of returning from the mode of adding photos back to the gallery
    buttonFleche.addEventListener("click", () => {
      buttonFleche.remove();
      btnValider.remove();
      errorMessage.remove();
      btnAjouter.style.display = "block";
      modalTitle.innerText = "Galerie photo";
      modalBody.style.display = "grid";
      modalHeader.style.justifyContent = "end";
      showAllProjectsInModalWindow();
    });

    //The function of displaying the added photo
    inputFile.addEventListener("change", (event) => {
      if (event.target.files && event.target.files.length) {
        preview.style.cssText = `
        width: 168px;
        height: 100%;
        `;
        fileParagraph.style.display = "none";
        labelFile.style.display = "none";
        preview.src = window.URL.createObjectURL(event.target.files[0]);
      }
    });

    //Sending a new photo to the server
    //The send button becomes active

    modalTitle.insertAdjacentHTML(
      "beforebegin",
      "<p class = 'errorMessage' ></ p>"
    );
    const errorMessage = document.querySelector(".errorMessage");

    formAddingPhoto.addEventListener("change", () => {
      if (select.value && inputFile.value && inputText.value) {
        btnValider.disabled = false;
        return;
      }
      errorMessage.innerText = "Remplissez tous les champs";
      setTimeout(() => (errorMessage.innerText = ""), 3500);
      btnValider.disabled = true;
    });

    //Processing the form submission
    formAddingPhoto.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!select.value && !inputFile.value && !inputText.value) {
        return;
      }
      let response = await postData(host + "works", formAddingPhoto);
      if (response.ok) {
        buttonFleche.remove();
        btnValider.remove();
        errorMessage.remove();
        btnAjouter.style.display = "block";
        modalTitle.innerText = "Galerie photo";
        modalBody.style.display = "grid";
        modalHeader.style.justifyContent = "end";
        showAllProjectsInModalWindow();
        showAllProjects();
      }
    });

    btnValider.addEventListener("click", async (event) => {
      event.preventDefault();
      if (!select.value && !inputFile.value && !inputText.value) {
        return;
      }
      let response = await postData(host + "works", formAddingPhoto);
      if (response.ok) {
        buttonFleche.remove();
        btnValider.remove();
        errorMessage.remove();
        btnAjouter.style.display = "block";
        modalTitle.innerText = "Galerie photo";
        modalBody.style.display = "grid";
        modalHeader.style.justifyContent = "end";
        showAllProjectsInModalWindow();
        showAllProjects();
      }
    });
  });
};

export { functionAddingPhotos };
