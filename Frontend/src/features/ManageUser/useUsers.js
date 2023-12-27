import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../services/apiUser';
import { useEffect, useState } from 'react';

const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (data) {
      // Filter users based on the search term
      const filtered = data.filter(
        (user) =>
          user.fullName?.toLowerCase()?.indexOf(searchTerm) > -1 ||
          user.department?.toLowerCase()?.indexOf(searchTerm) > -1
      );
      setFilteredUsers(filtered);
    }
  }, [data, searchTerm]);

  const onSearch = (e) => {
    const value = e.target.value?.toLowerCase();
    setSearchTerm(value);
  };

  return {
    users: searchTerm ? filteredUsers : data,
    isLoading,
    onSearch,
    searchTerm,
  };
};

export default useUser;
