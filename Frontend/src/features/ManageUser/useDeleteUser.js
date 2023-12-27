import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteUser as deleteUserApi } from '../../services/apiUser';
import onCloseModal from '../../utils/onCloseModal';

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
  });

  return { deleteUser, isLoading };
};

export default useDeleteUser;
