import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../../services/apiAuth';

const useUser = () => {
  const jwt = localStorage.getItem('jwt');
  if (!jwt)
    return { user: undefined, isAuthenticated: false, isLoading: false };
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    onError: () => {
      localStorage.removeItem('jwt');
    },
  });
  return { user, isAuthenticated: user?.fullName, isLoading };
};

export default useUser;
