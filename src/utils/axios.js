import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://192.168.219.107:3000',
});

export default axios;