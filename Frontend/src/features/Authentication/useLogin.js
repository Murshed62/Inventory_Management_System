import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../services/apiAuth';
import getErrorMessage from '../../utils/getErrorMessage';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { user, token } = data;
      localStorage.setItem('jwt', token);
      queryClient.setQueryData(['user'], user);
      navigate('/');
      toast.success(`Welcome ${user.fullName} 👋`);
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });

  return { onsubmitHandler: mutate, isLoading, error };
};

export default useLogin;
