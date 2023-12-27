import axios from './axios';

export const getSettings = async () => {
  const { data } = await axios.get(`/settings`);
  return data.data[0];
};

export const updateSettings = async (id, body) => {
  await axios.patch(`/settings/${id}`, body);
  return id;
};
