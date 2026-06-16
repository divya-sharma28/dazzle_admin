/* eslint-disable no-undef */
import axios from "axios";

const TOKEN = (JSON.parse(localStorage.getItem("currentUser"))?.token);
export const publicRequest = axios.create({
    baseURL: process.env.VITE_BASE_URL,
});

export const userRequest= axios.create({
    baseURL: process.env.VITE_BASE_URL,
    headers:{access_token: `Bearer ${TOKEN}`}
});

// userRequest.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 403) {
//       localStorage.removeItem("currentUser");
//       window.location.href = "/login"; // redirect to login
//     }
//     return Promise.reject(error);
//   }
// );