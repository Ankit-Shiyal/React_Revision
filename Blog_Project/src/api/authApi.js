import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function registerUser(userData) {
  try {
    const res = await axios.post(`${BASE_URL}/user/addUser`, userData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function loginUser(userData) {
  try {
    const res = await axios.post(`${BASE_URL}/user/userLogin`, userData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getProfile() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${BASE_URL}/user/authLogin`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function logoutUser() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${BASE_URL}/user/logoutUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}