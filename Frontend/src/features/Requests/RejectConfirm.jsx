import { useState } from 'react';
import useUpdateRequest from './useUpdateRequest';
import Heading from '../../UI/Heading';
import Spinner from '../../UI/Spinner';

const RejectConfirm = ({ onCloseModal, request }) => {
  const { _id } = request;
  const [description, setDescription] = useState('');
  const { isLoading, updateRequest } = useUpdateRequest();
  const onReject = () => {
    const body = {
      status: 'rejected',
      description,
    };
    updateRequest({ id: _id, body });
  };
  return (
    <div>
      <Heading as='h3'>Reject request</Heading>
      <div className='my-3'>
        <label htmlFor='description' className=' label'>
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=' textarea textarea-primary w-full'
        />
      </div>

      <div className='flex justify-end gap-2'>
        <button className='btn btn-outline' onClick={onCloseModal}>
          Cancel
        </button>
        <button
          className='btn btn-error'
          onClick={onReject}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default RejectConfirm;
