import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/apiCategory';
import { useEffect, useState } from 'react';

const useCategories = (onlyNames = false) => {
  const { data, isLoading } = useQuery({
    queryKey: [`categories${onlyNames ? '-only-names' : ''}`],
    queryFn: () => getCategories(onlyNames),
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (data) {
      // Filter users based on the search term
      const filtered = data.filter(
        (category) => category.title?.toLowerCase()?.indexOf(searchTerm) > -1
      );
      setFilteredUsers(filtered);
    }
  }, [data, searchTerm]);

  const onSearch = (e) => {
    const value = e.target.value?.toLowerCase();
    setSearchTerm(value);
  };

  return {
    categories: searchTerm ? filteredUsers : data,
    isLoading,
    onSearch,
    searchTerm,
  };
};

export default useCategories;
