import { BehaviorSubject } from "rxjs";

import config from "config";
import { fetchWrapper, history } from "@/_helpers";

const userSubject = new BehaviorSubject(null);
//const serverUrl = "http://localhost:8080";
const serverUrl = "https://idsheet.com/Aqar";
const baseUrl = `${serverUrl}/users`;

export const accountService = {
  setUser,
  login,
  socialLogin,
  updateProfileImage,
  logout,
  refreshToken,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  uploadProfilePicture,
  getAll,
  getById,
  getByTagCode,
  create,
  update,
  updatePublicProfile,
  getPublicProfile,
  delete: _delete,
  serverUrl,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

function setUser(user) {
  if (user != null) userSubject.next(user);
}

function login(username, password) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { username, password })
    .then((user) => {
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      startRefreshTokenTimer();
      if (user != null) {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("jwt", user.jwtToken);
      }
      return user;
    });
}

function socialLogin(token, provider) {
  return fetchWrapper
    .post(`${baseUrl}/social-authenticate`, { ...token, provider })
    .then((user) => {
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      startRefreshTokenTimer();
      if (user != null) {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("jwt", user.jwtToken);
      }
      return user;
    });
}
function updateProfileImage(val) {
  userSubject.value.profileImage = val;
  sessionStorage.setItem("user", JSON.stringify(userSubject.value));
  userSubject.next(userSubject.value);
}
function logout() {
  // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("jwt");
  fetchWrapper.post(`${baseUrl}/revoke-token`, {});
  stopRefreshTokenTimer();
  userSubject.next(null);
  history.push("/guest");
}

function refreshToken() {
  return fetchWrapper
    .post(`${baseUrl}/refresh-token`, sessionStorage.getItem("jwt"))
    .then((user) => {
      console.log("Token was refreshed");
      console.log(user);
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      startRefreshTokenTimer();
      return user;
    });
}

function register(params) {
  return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
  return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function forgotPassword(email) {
  return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token) {
  return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
  return fetchWrapper.post(`${baseUrl}/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}

function uploadProfilePicture(file) {
  //return fetchWrapper.postFile(`${baseUrl}/upload-profile-picture`, file);
  return fetchWrapper.postBlob(`${baseUrl}/upload-profile-picture`, file);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getByTagCode(tagCode) {
  return fetchWrapper.get(`${baseUrl}/by-tag-code/${tagCode}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((user) => {
    // update stored user if the logged in user updated their own record
    if (user.id === userSubject.value.id) {
      // publish updated user to subscribers
      user = { ...userSubject.value, ...user };
      userSubject.next(user);
    }
    return user;
  });
}

function updatePublicProfile(params) {
  return fetchWrapper.post(`${baseUrl}/update-public-profile`, params);
}
function getPublicProfile() {
  return fetchWrapper.get(`${baseUrl}/get-public-profile`);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`).then((x) => {
    // auto logout if the logged in user deleted their own record
    if (id === userSubject.value.id) {
      logout();
    }
    return x;
  });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
  // parse json object from base64 encoded jwt token
  const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split(".")[1]));

  // set a timeout to refresh the token a minute before it expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
