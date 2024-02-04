// services/usersService.js
import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/users'; // Adjust the URL based on your server configuration

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export default { getAll };