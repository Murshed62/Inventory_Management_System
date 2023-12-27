import axios from './axios';

export const createCategory = async (body) => {
  const { data } = await axios.post('/categories', body);
  return data.data;
};
export const getCategories = async (onlyNames) => {
  const { data } = await axios.get(
    `/categories${onlyNames ? '?names=true' : ''}`
  );
  return data.data;
};
export const updateCategory = async (id, body) => {
  await axios.patch(`/categories/${id}`, body);
  return id;
};
export const deleteCategory = async (id) => {
  await axios.delete(`/categories/${id}`);
  return id;
};
