import axios from './axios';

export const createRequest = async (body) => {
  const { data } = await axios.post('/requests', body);
  return data.data;
};
export const getRequests = async (query) => {
  const { data } = await axios.get(`/requests?${query || ''}`);
  return data;
};

export const myRequests = async (query) => {
  const { data } = await axios.get(`/requests/my?${query || ''}`);
  return data;
};

export const updateRequest = async (id, body) => {
  await axios.patch(`/requests/${id}`, body);
  return id;
};
export const deleteRequest = async (id) => {
  await axios.delete(`/requests/${id}`);
  return id;
};

export const countPending = async () => {
  const { data } = await axios.get(`/requests/count-pending`);
  return data.data;
};
