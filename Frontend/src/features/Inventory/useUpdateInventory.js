import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateInventory as updateInventoryApi } from '../../services/apiInventory';
import getErrorMessage from '../../utils/getErrorMessage';
import onCloseModal from '../../utils/onCloseModal';

const useCreateInventory = () => {
  const queryClient = useQueryClient();
  const { mutate: updateInventory, isLoading } = useMutation({
    mutationFn: ({ id, body }) => updateInventoryApi(id, body),
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['inventories'] });
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });
  return { updateInventory, isLoading };
};

export default useCreateInventory;
