import http from "./httpService";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
const apiEndpoint = "/auth/jwt/create/";
const meEndpoint = "/auth/users/me/";

http.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, jwt.access);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function getMe() {
  return await http.get(meEndpoint, {
    headers: {
      Authorization: `JWT ${getJwt()}`,
    },
  });
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  getMe,
};
