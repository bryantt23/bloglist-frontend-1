import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = async (updatedBlog, blogId) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog);
  return response.data;
};

const deleteBlog = async (token, blogId) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { getAll, addBlog, updateBlog, deleteBlog };
