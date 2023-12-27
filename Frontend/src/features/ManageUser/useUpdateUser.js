import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUser as updateUserApi } from '../../services/apiUser';
import getErrorMessage from '../../utils/getErrorMessage';
import onCloseModal from '../../utils/onCloseModal';

const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ id, body }) => updateUserApi(id, body),
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });
  return { updateUser, isLoading };
};

export default useCreateUser;
