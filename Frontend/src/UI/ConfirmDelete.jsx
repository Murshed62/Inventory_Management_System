import Heading from './Heading';
import Spinner from './Spinner';

const ConfirmDelete = ({
  resourceName,
  onCloseModal,
  isLoading,
  confirmAction,
}) => {
  return (
    <div>
      <Heading as='h3'>Delete {resourceName}</Heading>
      <p className='py-3'>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undo.
      </p>
      <div className='flex justify-end gap-2'>
        <button className='btn btn-outline' onClick={onCloseModal}>
          Cancel
        </button>
        <button
          className='btn btn-error'
          onClick={confirmAction}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
