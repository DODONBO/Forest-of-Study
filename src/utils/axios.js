import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "x-user-id": 'f84a713d-b50c-4571-8a56-ed98e6b32aa2'
  }
});

export default axios;