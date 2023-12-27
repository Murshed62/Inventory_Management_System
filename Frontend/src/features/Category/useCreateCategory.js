import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCategory as createCategoryApi } from '../../services/apiCategory';
import getErrorMessage from '../../utils/getErrorMessage';
import onCloseModal from '../../utils/onCloseModal';

const useCreateCategory = (reset) => {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      reset();
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      const msg = getErrorMessage(error);
      toast.error(msg);
    },
  });
  return { createCategory, isLoading };
};

export default useCreateCategory;
