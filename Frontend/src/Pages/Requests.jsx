import Heading from '../UI/Heading';
import FilterByDept from '../features/Requests/FilterByDept';
import RequestsFilter from '../features/Requests/RequestsFilter';
import RequestList from '../features/Requests/RequestList';
import useRequests from '../features/Requests/useRequests';
import useAuth from '../hooks/useAuth';
import Pagination from '../UI/Pagination';

const Requests = () => {
  const { requests, isLoading, totalDoc } = useRequests();
  const { isSuperAdmin } = useAuth();
  return (
    <>
      <Heading as='h3'>Product requests</Heading>
      {/* Actions (filter,sort) */}
      <div className='flex justify-end items-center gap-4'>
        <RequestsFilter />
        {isSuperAdmin && <FilterByDept />}
      </div>
      <RequestList isLoading={isLoading} requests={requests} />
      <div className='flex justify-center my-6'>
        <Pagination totalItems={totalDoc} />
      </div>
    </>
  );
};

export default Requests;
