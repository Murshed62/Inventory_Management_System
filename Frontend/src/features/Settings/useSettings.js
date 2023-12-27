import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

const useSettings = (disabled = false) => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    enabled: !disabled,
  });
  return { settings, isLoading };
};

export default useSettings;
