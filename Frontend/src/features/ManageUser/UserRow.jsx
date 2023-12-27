import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Highlighter from 'react-highlight-words';
import Modal from '../../UI/Modal';
import CreateEditForm from './CreateUpdateForm';
import ConfirmDelete from '../../UI/ConfirmDelete';
import useDeleteUser from './useDeleteUser';

const UserRow = ({ user, index, searchTerm }) => {
  const { _id, fullName, department, role } = user || {};
  const { deleteUser, isLoading } = useDeleteUser();
  const onDeleteHandler = () => {
    deleteUser(_id);
  };
  return (
    <tr key={_id}>
      <th>{index + 1}</th>
      <td>
        <Highlighter
          highlightClassName='bg-primary text-white'
          searchWords={[searchTerm]}
          autoEscape={true}
          textToHighlight={fullName || ''}
        />
      </td>
      <td>
        <Highlighter
          highlightClassName='bg-primary text-white'
          searchWords={[searchTerm]}
          autoEscape={true}
          textToHighlight={department || ''}
        />
      </td>
      <td>{role}</td>
      <td>
        <Modal id={`${_id}_edit`}>
          <Modal.Open>
            <button className=' btn btn-circle text-secondary'>
              <HiOutlinePencilSquare size={20} />
            </button>
          </Modal.Open>
          <Modal.Window>
            <CreateEditForm editUser={user} />
          </Modal.Window>
        </Modal>
      </td>
      <td>
        <Modal id={`${_id}_delete`}>
          <Modal.Open>
            <button className=' btn btn-circle text-error'>
              <HiOutlineTrash size={20} />
            </button>
          </Modal.Open>
          <Modal.Window>
            <ConfirmDelete
              confirmAction={onDeleteHandler}
              isLoading={isLoading}
              resourceName='user'
            />
          </Modal.Window>
        </Modal>
      </td>
    </tr>
  );
};

export default UserRow;
