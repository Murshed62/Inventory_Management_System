import axios from './axios';

export const updateMe = async (body) => {
  const { data } = await axios.patch('/users/update-me', body);
  return data.data;
};

export const updatePassword = async (body) => {
  const { data } = await axios.patch('/users/update-password', body);
  return { user: data.data, token: data.token };
};

export const createUser = async (body) => {
  const { data } = await axios.post('/users/dept-admin', body);
  return data.data;
};
export const getUsers = async () => {
  const { data } = await axios.get('/users/dept-admin');
  return data.data;
};
export const updateUser = async (id, body) => {
  await axios.patch(`/users/dept-admin/${id}`, body);
  return id;
};
export const deleteUser = async (id) => {
  await axios.delete(`/users/dept-admin/${id}`);
  return id;
};
