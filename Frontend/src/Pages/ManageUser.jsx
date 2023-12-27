import Heading from '../UI/Heading';
import UserListTable from '../features/ManageUser/UserListTable';
import UserSearch from '../features/ManageUser/UserSearch';
import UserCreate from '../features/ManageUser/UserCreate';
import useUsers from '../features/ManageUser/useUsers';

const ManageUser = () => {
  const { users, isLoading, onSearch, searchTerm } = useUsers();
  return (
    <>
      <Heading as='h1'>Manage User</Heading>
      <div className='flex justify-between my-5 flex-col md:flex-row'>
        <UserSearch onSearch={onSearch} />

        <UserCreate />
      </div>
      <UserListTable
        isLoading={isLoading}
        users={users}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default ManageUser;
