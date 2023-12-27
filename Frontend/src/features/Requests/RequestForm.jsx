import { useState } from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import Heading from '../../UI/Heading';
import useAuth from '../../hooks/useAuth';
import useCreateRequest from './useCreateRequest';
import useUpdateRequest from './useUpdateRequest';
import useSettings from '../Settings/useSettings';

const RequestForm = ({ inventory, onCloseModal, request }) => {
  const { user, isSuperAdmin } = useAuth();
  const { settings } = useSettings(isSuperAdmin);
  const { _id: reqId, ...requestValues } = request || {};
  const isEditSettion = Boolean(reqId);
  const [value, setValue] = useState(
    isEditSettion ? requestValues.quantityAsk : 1
  );
  const { _id, name, inStock, category } = inventory;

  const { createRequest, isLoading: isCreating } = useCreateRequest();
  const { isLoading: isUpdating, updateRequest } = useUpdateRequest();
  const onCreateHandler = () => {
    const data = {
      product: _id,
      user: user?._id,
      quantityAsk: value,
      department: user?.department,
    };
    if (isEditSettion) return updateRequest({ id: reqId, body: data });
    createRequest(data);
  };
  const isLoading = isCreating || isUpdating;
  return (
    <div>
      <Heading as='h4'>Create Request</Heading>
      <div className='text-muted my-2'>
        <p>
          <span className=' font-bold'>Product name:</span> {name}
        </p>
        <p>
          <span className=' font-bold'>Category:</span> {category.title}
        </p>
        <p>
          <span className=' font-bold'>Available quantity:</span> {inStock}
        </p>
        <p>
          <span className=' font-bold'>Required product quantity: </span>
          <input
            type='number'
            className='input input-primary input-sm w-20'
            min={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            max={settings?.maxProductRequest}
          />
        </p>
      </div>
      {value > inStock && inStock !== 0 && (
        <small className='flex gap-1 text-warning'>
          <HiOutlineExclamationTriangle size={20} />
          <span>
            Your request product is greater than available product, That might
            take some times to accept.
          </span>
        </small>
      )}
      {inStock === 0 && (
        <small className='flex items-center gap-1 text-warning'>
          <HiOutlineExclamationTriangle size={20} />
          <span>
            This product is currently unavailable, That might take some times to
            accept.
          </span>
        </small>
      )}

      <div className='flex gap-2 mt-5'>
        <button className='btn btn-outline' onClick={onCloseModal}>
          Close
        </button>
        <button
          className='btn btn-primary'
          disabled={isLoading}
          onClick={onCreateHandler}
        >
          {isLoading ? (
            <span className='loading loading-infinity loading-md text-secondary'></span>
          ) : isEditSettion ? (
            'Edit'
          ) : (
            'Create'
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestForm;
