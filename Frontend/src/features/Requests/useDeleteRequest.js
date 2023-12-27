import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRequest as deleteRequestApi } from '../../services/apiRequest';
import toast from 'react-hot-toast';
import onCloseModal from '../../utils/onCloseModal';

const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteRequest, isLoading } = useMutation({
    mutationFn: deleteRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      onCloseModal();
      toast.success('Request deleted successfully!');
    },
  });
  return { isLoading, deleteRequest };
};
export default useDeleteRequest;
