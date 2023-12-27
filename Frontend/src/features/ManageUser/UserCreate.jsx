import { HiOutlineUserPlus } from 'react-icons/hi2';
import Modal from '../../UI/Modal';
import CreateUpdateForm from './CreateUpdateForm';

const UserCreate = () => {
  return (
    <Modal id='create-user'>
      <Modal.Open>
        <button className='btn btn-secondary'>
          <HiOutlineUserPlus size={30} />
          Create new
        </button>
      </Modal.Open>
      <Modal.Window>
        <CreateUpdateForm />
      </Modal.Window>
    </Modal>
  );
};

export default UserCreate;
