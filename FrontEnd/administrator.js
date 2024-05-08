if (localStorage.authorizationSB) {
  //Adding the "Mode edition" header
  const content = document.querySelector(".content-body");
  content.insertAdjacentHTML(
    "beforebegin",
    '<div class = "mode-edition"></div>'
  );
  const edition = document.querySelector(".mode-edition");
  edition.style.cssText = `
    display: flex;
    color: white;
    font-size: 16px;
    justify-content: center;
    gap: 10px;
    background-color: black;
    padding: 20px 0;
  `;
  edition.innerHTML =
    "<img src = './assets/icons/white pen.png' /> <p>Mode édition</p>";

  //Logout button
  const logout = document.querySelector('[href="./loginPage/login.html"]');
  logout.innerText = "logout";
  logout.href = "";
  logout.addEventListener("click", () => {
    localStorage.removeItem("authorizationSB");
    window.location.href = "./index.html";
  });

  //Adding a modification button
  const projectTitle = document.querySelector("#portfolio > h2");
  projectTitle.style.marginBottom = "93px";
  const modificationArea = document.createElement("div");
  projectTitle.parentElement.replaceChild(modificationArea, projectTitle);
  modificationArea.appendChild(projectTitle);
  modificationArea.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 25px; 
  `;
  const modificationButton = document.createElement("div");
  modificationButton.innerHTML =
    "<img src='./assets/icons/black pen.png' /><p>modifier</p>";
  modificationButton.style.cssText = `
    display: flex;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
    height: 22px;
    align-items: flex-end;
  `;
  projectTitle.after(modificationButton);
  const blackPen = document.querySelector("h2+div img");
  blackPen.style.height = "16px";
}
