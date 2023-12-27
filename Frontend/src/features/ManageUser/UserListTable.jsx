import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Highlighter from 'react-highlight-words';
import Modal from '../../UI/Modal';
import CreateEditForm from './CreateUpdateForm';
import ConfirmDelete from '../../UI/ConfirmDelete';
import UserRow from './UserRow';

const UserListTable = ({ users, isLoading, searchTerm }) => {
  return (
    <div className='card shadow-md bg-base-100'>
      <div className='card-body overflow-x-auto flex justify-center items-center min-h-[300px]'>
        {isLoading ? (
          <span className='loading loading-infinity loading-lg'></span>
        ) : (
          <table className='table table-zebra'>
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Full name</th>
                <th>Department</th>
                <th>Role</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserRow
                  key={user._id}
                  index={index}
                  searchTerm={searchTerm}
                  user={user}
                />
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserListTable;
