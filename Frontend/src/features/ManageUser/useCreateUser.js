import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createUser as createUserApi } from '../../services/apiUser';
import getErrorMessage from '../../utils/getErrorMessage';
import onCloseModal from '../../utils/onCloseModal';

const useCreateUser = (reset) => {
  const queryClient = useQueryClient();
  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      reset();
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });
  return { createUser, isLoading };
};

export default useCreateUser;
