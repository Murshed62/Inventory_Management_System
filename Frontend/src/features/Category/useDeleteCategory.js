import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCategory as deleteCategoryApi } from '../../services/apiCategory';
import onCloseModal from '../../utils/onCloseModal';

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, isLoading } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    },
  });

  return { deleteCategory, isLoading };
};

export default useDeleteCategory;
