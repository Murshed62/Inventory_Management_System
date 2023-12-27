import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import onCloseModal from '../../utils/onCloseModal';
import { createRequest as createRequestApi } from '../../services/apiRequest';

const useCreateRequest = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate: createRequest } = useMutation({
    mutationFn: createRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      onCloseModal();
      toast.success('Request successfully created!');
    },
  });
  return { isLoading, createRequest };
};

export default useCreateRequest;
