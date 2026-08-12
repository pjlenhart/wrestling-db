import axios from "axios";

// REACT_APP_API_URL lets a dev session point at a different API -- notably one
// running against a local database, since the default 8001 instance is usually
// configured against production.
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV !== "production"
    ? "http://localhost:8001/"
    : "https://thswrestlingdb.com/");

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (expectedError) {
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
