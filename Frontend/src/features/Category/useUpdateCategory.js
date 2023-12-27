import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCategory as updateCategoryApi } from '../../services/apiCategory';
import getErrorMessage from '../../utils/getErrorMessage';
import onCloseModal from '../../utils/onCloseModal';

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCategory, isLoading } = useMutation({
    mutationFn: ({ id, body }) => updateCategoryApi(id, body),
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });
  return { updateCategory, isLoading };
};

export default useCreateCategory;
