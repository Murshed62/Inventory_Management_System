import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteInventory as deleteInventoryApi } from '../../services/apiInventory';
import onCloseModal from '../../utils/onCloseModal';

const useDeleteInventory = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteInventory, isLoading } = useMutation({
    mutationFn: deleteInventoryApi,
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['inventories'] });
      toast.success('Inventory deleted successfully');
    },
  });

  return { deleteInventory, isLoading };
};

export default useDeleteInventory;
