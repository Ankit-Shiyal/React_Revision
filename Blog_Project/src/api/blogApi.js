import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function getAllBlogs() {
  try {
    const res = await axios.get(`${BASE_URL}/blog/allBlog`, {
      headers: getHeaders(),
    });

    return res.data.blogs;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function addBlog(BlogData) {
  try {
    const res = await axios.post(`${BASE_URL}/blog/add`, BlogData, {
      headers: getHeaders(),
    });

    return res.data.newBlog;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteBlog(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/blog/delete/${id}`, {
      headers: getHeaders(),
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateBlog(id, BlogData) {
  try {
    const res = await axios.patch(`${BASE_URL}/blog/update/${id}`, BlogData, {
      headers: getHeaders(),
    });

    return res.data.blog;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}