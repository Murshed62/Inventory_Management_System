import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateMe } from '../../services/apiUser';
import getErrorMessage from '../../utils/getErrorMessage';

const useUpdateMe = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateMe,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });
  return { update: mutate, isLoading };
};

export default useUpdateMe;
