import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRequest as updateRequestApi } from '../../services/apiRequest';
import toast from 'react-hot-toast';
import onCloseModal from '../../utils/onCloseModal';
import getErrorMessage from '../../utils/getErrorMessage';

const useUpdateRequest = (successMsg) => {
  const queryClient = useQueryClient();
  const { mutate: updateRequest, isLoading } = useMutation({
    mutationFn: ({ id, body }) => updateRequestApi(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      queryClient.invalidateQueries({ queryKey: ['count-pending'] });
      onCloseModal();
      toast.success(successMsg || 'Request updated successfully!');
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });
  return { isLoading, updateRequest };
};
export default useUpdateRequest;
