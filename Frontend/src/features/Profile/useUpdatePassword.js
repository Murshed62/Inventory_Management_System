import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updatePassword } from '../../services/apiUser';
import getErrorMessage from '../../utils/getErrorMessage';

const useUpdatePassword = (reset) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: updatePassword,
    onSuccess: ({ user, token }) => {
      queryClient.setQueryData(['user'], user);
      localStorage.setItem('jwt', token);
      toast.success('Password updated successfully');
      reset();
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });
  return { updatePassword: mutate, isLoading };
};

export default useUpdatePassword;
