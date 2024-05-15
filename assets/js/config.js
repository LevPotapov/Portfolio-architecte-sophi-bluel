//Host settings
const host = "http://localhost:5678/api/";

//Data acquisition function
const getData = (url) =>
  new Promise((resolve, reject) =>
    fetch(url)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error))
  );

// Data POST function
const postData = (url, options) => {
  if (typeof options === "string") {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: options,
    });
  }

  const token = JSON.parse(localStorage.getItem("authorizationSB")).token;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: new FormData(options),
  });
};

// Data DELETE function
const deleteData = (url) => {
  const token = JSON.parse(localStorage.getItem("authorizationSB")).token;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

//Exporting the configuration
export { host, getData, postData, deleteData };
