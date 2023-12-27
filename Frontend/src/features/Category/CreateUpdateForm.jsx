import { useForm } from 'react-hook-form';
import useCreateCategory from './useCreateCategory';
import useUpdateCategory from './useUpdateCategory';

const CreateUpdateForm = ({ onCloseModal, editCategory = {} }) => {
  const { _id, ...editValues } = editCategory || {};
  const isEditSession = Boolean(_id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  //   const { onsubmitHandler, isLoading } = useLogin();
  const { createCategory, isLoading: isCreating } = useCreateCategory(reset);
  const { updateCategory, isLoading: isUpdating } = useUpdateCategory();

  const isLoading = isCreating || isUpdating;

  const submitHandler = (data) => {
    if (data.title === editValues.title) return onCloseModal();
    if (isEditSession) return updateCategory({ id: _id, body: data });
    createCategory(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='flex flex-col gap-5'
    >
      <div className='flex flex-col gap-1'>
        <label htmlFor='title'>Title</label>
        <input
          disabled={isLoading}
          id='title'
          type='text'
          placeholder='Enter full name'
          className='input input-bordered input-primary w-full'
          {...register('title', {
            required: 'Title is required',
            validate: (value) => value.trim()?.length > 0 || 'Invalid input',
          })}
        />
        {errors?.title?.message && (
          <span className='text-error'>{errors?.title?.message}</span>
        )}
      </div>

      <div className='flex justify-end gap-4'>
        <button
          type='button'
          className='btn btn-outline'
          onClick={onCloseModal}
        >
          Close
        </button>
        <button disabled={isLoading} className='btn btn-primary'>
          {isLoading ? (
            <span className='loading loading-infinity loading-md text-secondary'></span>
          ) : isEditSession ? (
            'Update'
          ) : (
            'Create'
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateUpdateForm;
