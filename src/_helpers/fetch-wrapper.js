import config from "config";
import { accountService } from "@/_services";

export const fetchWrapper = {
  get,
  post,
  postFile,
  postBlob,
  put,
  delete: _delete,
};

function get(url) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(url)},
    //mode: "cors"
  };
  //console.log(requestOptions)
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    //credentials: 'include',
    body: JSON.stringify(body),
  };
  //console.log(requestOptions);
  return fetch(url, requestOptions).then(handleResponse);
}

function postFile(url, file) {
  // Create an object of formData
  const formData = new FormData();
  // Update the formData object
  formData.append("file", file);
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(url) },
    //credentials: 'include',
    body: formData,
  };
  //console.log(requestOptions);
  return fetch(url, requestOptions).then(handleResponse);
}

function postBlob(url, blob) {
  // Create an object of formData
  const formData = new FormData();
  // Update the formData object
  formData.append("file",  blob);
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(url) },
    //credentials: 'include',
    body: formData,
  };
  //console.log(requestOptions);
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = accountService.userValue;
  const isLoggedIn = user && user.jwtToken;
  const isApiUrl = url.startsWith(config.apiUrl);
  //console.log("api url", config.apiUrl);
  //console.log(config.apiUrl+"/"+url)
  if (isLoggedIn && isApiUrl) {
    //console.log({ Authorization: `Bearer ${user.jwtToken}` });
    return { Authorization: `Bearer ${user.jwtToken}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  //console.log("response:",response);
  return response.text().then((text) => {
    //console.log("text",text);
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && accountService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        accountService.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
