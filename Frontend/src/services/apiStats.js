import axios from './axios';

export const getTotals = async () => {
  const { data } = await axios.get('/stats/totals');
  return data.data;
};
