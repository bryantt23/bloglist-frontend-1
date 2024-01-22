import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const addBlog = (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const request = axios.post(baseUrl, newBlog, config);
  return request.then(response => response.data);
};

const updateBlog=(updatedBlog,  blogId)=>{
  const request = axios.put(`${baseUrl}/${blogId}`, updatedBlog);
  return request.then(response => response.data);
}

const deleteBlog=(token,  blogId)=>{
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const request = axios.delete(`${baseUrl}/${blogId}`, config);
  return request.then(response => response.data);
}


export default { getAll, addBlog, updateBlog , deleteBlog};
