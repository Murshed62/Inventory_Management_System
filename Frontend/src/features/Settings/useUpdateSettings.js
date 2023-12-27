import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSettings as updateSettingsApi } from '../../services/apiSettings';

const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading } = useMutation({
    mutationFn: ({ id, body }) => updateSettingsApi(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Setting updated successfull!');
    },
  });
  return { updateSetting, isLoading };
};

export default useUpdateSettings;
