import axios from './axios';

export const createInventory = async (body) => {
  const { data } = await axios.post('/products', body);
  return data.data;
};
export const getInventories = async (query) => {
  const { data } = await axios.get(`/products?${query || ''}`);
  return data;
};
export const searchInventories = async (query) => {
  const { data } = await axios.get(`/products/search?${query}`);
  return data;
};
export const updateInventory = async (id, body) => {
  await axios.patch(`/products/${id}`, body);
  return id;
};
export const deleteInventory = async (id) => {
  await axios.delete(`/products/${id}`);
  return id;
};
