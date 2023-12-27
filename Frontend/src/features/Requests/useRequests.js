import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { getRequests, myRequests } from '../../services/apiRequest';
import { useSearchParams } from 'react-router-dom';

const LIMIT_ITEMS = import.meta.env.VITE_RESULT_LIMIT;

const useRequests = () => {
  const { isDeptAdmin } = useAuth();
  const [searchParams] = useSearchParams();
  let queryStr = '';
  // filter my status
  const status = searchParams.get('status');
  if (status) queryStr += `status=${status}&`;
  //  filter by department
  const department = searchParams.get('department');
  if (department) queryStr += `department=${department}&`;
  // pagination
  const page = searchParams.get('page');
  if (page) queryStr += `page=${page}&`;
  // Limit field
  queryStr += `limit=${LIMIT_ITEMS}`;
  const { data, isLoading } = useQuery({
    queryKey: ['requests', status, department, page],
    queryFn: () => (isDeptAdmin ? myRequests(queryStr) : getRequests(queryStr)),
  });

  return {
    requests: data?.data,
    totalDoc: data?.totalDoc,
    isLoading,
  };
};

export default useRequests;
