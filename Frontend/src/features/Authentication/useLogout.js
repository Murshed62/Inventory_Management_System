import { useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = () => {
    queryClient.removeQueries(['user']);
    localStorage.removeItem('jwt');
    window.location.assign('/login');
  };

  return { logout };
};

export default useLogout;
