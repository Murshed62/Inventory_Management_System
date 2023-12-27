import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getInventories, searchInventories } from '../../services/apiInventory';

const LIMIT_ITEMS = import.meta.env.VITE_RESULT_LIMIT;
const sortInt = (str) => (str === 'asc' ? '' : '-');

const useInventories = () => {
  let queryStr = '';
  const [searchParams] = useSearchParams();
  // paginations
  const page = searchParams.get('page') || 1;
  queryStr += `page=${page}&limit=${LIMIT_ITEMS}&`;
  // filtering
  const category = searchParams.get('category') || null;
  if (category) queryStr += `category=${category}&`;
  // sorting
  let sortBy = searchParams.get('sortBy') || 'name-asc';
  const [type, order] = sortBy.split('-');
  sortBy = `sort=${sortInt(order) + type}`;
  queryStr += `${sortBy}&`;
  //  searching
  const searchQuery = searchParams.get('search');
  if (searchQuery) queryStr += `name=${searchQuery}`;

  const { data, isLoading } = useQuery({
    queryKey: ['inventories', category, sortBy, `search=${searchQuery}`, page],
    queryFn: () =>
      searchQuery ? searchInventories(queryStr) : getInventories(queryStr),
  });

  return {
    inventories: data?.data,
    totalDoc: data?.totalDoc,
    isLoading,
  };
};

export default useInventories;
