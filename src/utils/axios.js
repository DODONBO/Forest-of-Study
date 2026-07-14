import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
 // baseURL:"https://localhost:3000" ,
});

export default axios;