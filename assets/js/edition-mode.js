/** @module EditionMode */

/**
 * a function that adds items available to the authorized user
 * @returns {undefined}
 */
const modeEditionFunction = () => {
  if (!localStorage.hasOwnProperty("authorizationSB")) {
    return;
  }

  /**Adding the "Mode edition" header*/
  const content = document.querySelector(".content-body");
  content.insertAdjacentHTML(
    "beforebegin",
    '<div class = "mode-edition"></div>'
  );
  const edition = document.querySelector(".mode-edition");
  const whitePen = document.createElement("img");
  whitePen.src = "./assets/icons/white pen.png";
  const modeEditionParagraph = document.createElement("p");
  modeEditionParagraph.innerText = "Mode édition";
  edition.append(whitePen, modeEditionParagraph);

  /**Logout button*/
  const logout = document.querySelector('[href="./login.html"]');
  logout.innerText = "logout";
  logout.href = "";
  logout.addEventListener("click", () => {
    localStorage.removeItem("authorizationSB");
    window.location.href = "./index.html";
  });

  /**Adding a modification button*/
  const projectTitle = document.querySelector("#portfolio > h2");
  projectTitle.classList.add("projectTitle");

  const modificationArea = document.createElement("div");
  modificationArea.classList.add("modificationArea");

  projectTitle.parentElement.replaceChild(modificationArea, projectTitle);
  modificationArea.appendChild(projectTitle);

  const modificationButton = document.createElement("div");
  modificationButton.classList.add("modificationButton");

  const blackPen = document.createElement("img");
  blackPen.src = "./assets/icons/black pen.png";
  blackPen.classList.add("blackPen");

  const modificatinLink = document.createElement("a");
  modificatinLink.href = "#";
  modificatinLink.innerText = "modifier";

  modificationButton.append(blackPen, modificatinLink);
  projectTitle.after(modificationButton);
};

export { modeEditionFunction };
