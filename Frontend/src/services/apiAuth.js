import axios from './axios';

export const login = async (body) => {
  const { data } = await axios.post('/users/login', body);
  return { token: data.token, user: data.data };
};

export const getCurrentUser = async () => {
  const { data } = await axios.get('/users/me');
  return data.data;
};
