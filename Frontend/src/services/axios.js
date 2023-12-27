import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axios.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt)
    config.headers = {
      Authorization: `Bearer ${jwt}`,
    };
  return config;
});

export default axios;
