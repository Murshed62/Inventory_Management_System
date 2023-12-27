import { useState } from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import useUpdateRequest from './useUpdateRequest';
import Heading from '../../UI/Heading';
import Spinner from '../../UI/Spinner';

const AcceptConfirm = ({ onCloseModal, request }) => {
  const { _id, quantityAsk, product } = request;
  const { inStock, name } = product || {};
  const [provide, setProvide] = useState(quantityAsk);
  const { isLoading, updateRequest } = useUpdateRequest();
  const onConfirm = () => {
    const body = {
      status: 'accepted',
      quantityProvide: +provide,
    };
    updateRequest({ id: _id, body });
  };
  return (
    <div>
      <Heading as='h3'>Accept request</Heading>
      <div className='text-muted my-2'>
        <p>
          <span className=' font-bold'>Product name:</span> {name}
        </p>
        <p>
          <span className=' font-bold'>Available quantity:</span> {inStock}
        </p>
        <p>
          <span className=' font-bold'>Required quantity:</span> {quantityAsk}
        </p>
        <p>
          <span className=' font-bold'>Provided quantity: </span>
          <input
            type='number'
            className='input input-primary input-sm w-20'
            min={1}
            max={inStock}
            value={provide}
            onChange={(e) => setProvide(e.target.value)}
          />
        </p>
      </div>
      {provide > inStock && (
        <small className='flex gap-1 text-warning'>
          <HiOutlineExclamationTriangle size={20} />
          <span>
            Provided quantity must less than or equal to product quantity.
          </span>
        </small>
      )}
      <div className='flex justify-end gap-2'>
        <button className='btn btn-outline' onClick={onCloseModal}>
          Cancel
        </button>
        <button
          className='btn btn-error'
          onClick={onConfirm}
          disabled={isLoading || provide > inStock}
        >
          {isLoading ? <Spinner /> : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default AcceptConfirm;
