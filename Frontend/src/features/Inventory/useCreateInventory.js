import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createInventory as createInventoryApi } from '../../services/apiInventory';
import getErrorMessage from '../../utils/getErrorMessage';
import onCloseModal from '../../utils/onCloseModal';

const useCreateInventory = (reset) => {
  const queryClient = useQueryClient();
  const { mutate: createInventory, isLoading } = useMutation({
    mutationFn: createInventoryApi,
    onSuccess: () => {
      reset();
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['inventories'] });
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });
  return { createInventory, isLoading };
};

export default useCreateInventory;
