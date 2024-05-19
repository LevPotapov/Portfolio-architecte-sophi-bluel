/** @module Config */

/**Host settings*/
const host = "http://localhost:5678/api/";

/**
 * Data acquisition function(this is an asynchronous function)
 * @param {string} url the url to which the request will be sent, required parameter
 * @returns {Promise} returns a promise, which in turn returns a response in Json format
 */
const getData = (url) =>
  new Promise((resolve, reject) =>
    fetch(url)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error))
  );

/**
 * A function for sending post and delete requests, using the Fetch function(this is an asynchronous function)
 * @param {string} url the url to which the request will be sent, required parameter
 * @param {string} method POST or DELETE a request, required parameter
 * @param {*} payload allows you to send a string or a FormData object in the request body, optional parameter
 * @returns {Promise} returns a promise, which in turn returns a special Response object
 */
const apiCall = (url, method, payload) => {
  let headers = null;
  let token = null;

  if (localStorage.hasOwnProperty("authorizationSB")) {
    token = JSON.parse(localStorage.getItem("authorizationSB")).token;
  }

  if (typeof payload === "string") {
    headers = {
      "Content-Type": "application/json;charset=utf-8",
    };
  } else {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return fetch(url, {
    method,
    headers,
    body: payload,
  });
};

/**Exporting the configuration*/
export { host, getData, apiCall };
