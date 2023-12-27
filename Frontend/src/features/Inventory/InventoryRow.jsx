import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import moment from 'moment';
import Modal from '../../UI/Modal';
import CreateEditForm from './CreateUpdateForm';
import ConfirmDelete from '../../UI/ConfirmDelete';
import useDeleteInventory from './useDeleteInventory';
import Tag from '../../UI/Tag';
import useAuth from '../../hooks/useAuth';
import RequestForm from '../Requests/RequestForm';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const InventoryRow = ({ inventory, index, isEnable }) => {
  const { isSuperAdmin, isDeptAdmin } = useAuth();
  const { _id, name, inStock, unitPrice, category, createdAt } =
    inventory || {};
  const { deleteInventory, isLoading } = useDeleteInventory();
  const onDeleteHandler = () => {
    deleteInventory(_id);
  };
  return (
    <tr key={_id}>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>{category?.title}</td>

      <td className="flex items-center mt-3">{unitPrice.toLocaleString()} <FaBangladeshiTakaSign size={10} /></td>
      <td>
        <span className='flex gap-1 items-center'>
          {inStock.toLocaleString()}
          {inStock === 0 && (
            <Tag type='error' size='sm'>
              Out of stock
            </Tag>
          )}
          {inStock < 10 && inStock > 0 && (
            <Tag type='warning' size='sm'>
              Low stock
            </Tag>
          )}
        </span>
      </td>
      <td>{moment(createdAt).format('DD/MM/YYYY')}</td>
      {isSuperAdmin && (
        <>
          <td>
            <Modal id={`${_id}_edit`}>
              <Modal.Open>
                <button className=' btn btn-circle text-secondary'>
                  <HiOutlinePencilSquare size={20} />
                </button>
              </Modal.Open>
              <Modal.Window>
                <CreateEditForm editInventory={inventory} />
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
                  resourceName='Inventory'
                />
              </Modal.Window>
            </Modal>
          </td>
        </>
      )}
      {isDeptAdmin && (
        <td>
          <Modal id={`${_id}_request`}>
            <Modal.Open>
              <button
                disabled={!isEnable}
                className=' btn btn-ghost btn-sm btn-outline'
              >
                Request
              </button>
            </Modal.Open>
            <Modal.Window>
              <RequestForm inventory={inventory} />
            </Modal.Window>
          </Modal>
        </td>
      )}
    </tr>
  );
};

export default InventoryRow;
