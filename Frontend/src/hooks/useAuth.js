import useUser from '../features/Authentication/useUser';
const useAuth = () => {
  const { user, ...rest } = useUser();

  return {
    user,
    isSuperAdmin: user?.role === 'super-admin',
    isDeptAdmin: user?.role === 'admin',
    ...rest,
  };
};

export default useAuth;
