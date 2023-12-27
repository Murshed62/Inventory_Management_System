import { HiOutlineSwatch } from 'react-icons/hi2';
import CreateUpdateForm from './CreateUpdateForm';
import Modal from '../../UI/Modal';

const CategoryCreate = () => {
  return (
    <Modal id='create-user'>
      <Modal.Open>
        <button className='btn btn-secondary'>
          <HiOutlineSwatch size={30} />
          Create new
        </button>
      </Modal.Open>
      <Modal.Window>
        <CreateUpdateForm />
      </Modal.Window>
    </Modal>
  );
};

export default CategoryCreate;
