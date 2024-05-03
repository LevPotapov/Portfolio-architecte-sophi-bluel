//Host settings
const host = "http://localhost:5678/api";

//Data acquisition function
const getData = (url) =>
  new Promise((resolve, reject) =>
    fetch(url)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error))
  );

//Functions for activating and deactivating buttons
const activateButton = (target) => {
  target.style.cssText = `
    background-color: #1D6154;
    color: white;
    font-family: 'Syne';
    font-size: 16px;
    font-weight: 700;
    padding: 6px 28px;
    border: solid 1px #1D6154;
    border-radius: 25px;
    cursor: pointer;
  `;
};

const deactivateButton = (target) => {
  target.style.cssText = `
    background-color: white;
    color: #1D6154;
    font-family: 'Syne';
    font-size: 16px;
    font-weight: 700;
    padding: 6px 28px;
    border: solid 1px #1D6154;
    border-radius: 25px;
    cursor: pointer;
  `;
};

//Exporting the configuration
export { host, getData, activateButton, deactivateButton };
