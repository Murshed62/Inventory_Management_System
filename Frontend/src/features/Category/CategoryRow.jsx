import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiArrowLongRight,
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import Modal from '../../UI/Modal';
import CreateEditForm from './CreateUpdateForm';
import ConfirmDelete from '../../UI/ConfirmDelete';
import useDeleteCategory from './useDeleteCategory';

const CategoryRow = ({ category, index, searchTerm }) => {
  const { _id, title, numOfProduct, totalQty } = category || {};
  const { deleteCategory, isLoading } = useDeleteCategory();
  const onDeleteHandler = () => {
    deleteCategory(_id);
  };
  return (
    <tr key={_id}>
      <th>{index + 1}</th>
      <td>
        <Highlighter
          highlightClassName='bg-primary text-white'
          searchWords={[searchTerm]}
          autoEscape={true}
          textToHighlight={title || ''}
        />
      </td>

      <td>{numOfProduct.toLocaleString()}</td>
      <td>{totalQty.toLocaleString()}</td>
      <td>
        <Modal id={`${_id}_edit`}>
          <Modal.Open>
            <button className=' btn btn-circle text-secondary'>
              <HiOutlinePencilSquare size={20} />
            </button>
          </Modal.Open>
          <Modal.Window>
            <CreateEditForm editCategory={category} />
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
              resourceName='category'
            />
          </Modal.Window>
        </Modal>
      </td>
      <td>
        <Link to={`/inventory?category=${_id}`} className='btn btn-text btn-sm'>
          View all <HiArrowLongRight />
        </Link>
      </td>
    </tr>
  );
};

export default CategoryRow;
