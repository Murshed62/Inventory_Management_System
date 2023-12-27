import { useForm } from 'react-hook-form';
import useCreateInventory from './useCreateInventory';
import useUpdateInventory from './useUpdateInventory';
import useCategories from '../Category/useCategories';

const CreateUpdateForm = ({ onCloseModal, editInventory = {} }) => {
  const { categories } = useCategories(true); // get only names

  const { _id, ...editValues } =
    { ...editInventory, category: editInventory?.category?._id } || {};
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
  const { createInventory, isLoading: isCreating } = useCreateInventory(reset);
  const { updateInventory, isLoading: isUpdating } = useUpdateInventory();

  const isLoading = isCreating || isUpdating;

  const submitHandler = (data) => {
    if (isEditSession) return updateInventory({ id: _id, body: data });
    createInventory(data);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='flex flex-col gap-5'
    >
      <div className='flex flex-col gap-1'>
        <label htmlFor='name'>Name</label>
        <input
          disabled={isLoading}
          id='name'
          type='text'
          placeholder='Enter full name'
          className='input input-bordered input-primary w-full'
          {...register('name', {
            required: 'Name is required',
            validate: (value) => value.trim()?.length > 0 || 'Invalid input',
          })}
        />
        {errors?.name?.message && (
          <span className='text-error'>{errors?.name?.message}</span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='title'>Category</label>
        <select
          className='select select-primary'
          {...register('category', {
            required: 'Category is required',
            validate: (val) => val !== 'select' || 'Category is required',
          })}
          defaultValue='select'
        >
          <option disabled value='select'>
            Select
          </option>

          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        {errors?.category?.message && (
          <span className='text-error'>{errors?.category?.message}</span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='unitPrice'>Unit price</label>
        <input
          disabled={isLoading}
          id='unitPrice'
          type='number'
          placeholder='Enter unit price'
          className='input input-bordered input-primary w-full'
          {...register('unitPrice', {
            required: 'Unit price is required',
          })}
        />
        {errors?.unitPrice?.message && (
          <span className='text-error'>{errors?.unitPrice?.message}</span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='inStock'>In stock</label>
        <input
          disabled={isLoading}
          id='inStock'
          type='number'
          placeholder='Enter Stock'
          className='input input-bordered input-primary w-full'
          {...register('inStock')}
          defaultValue={0}
        />
        {errors?.inStock?.message && (
          <span className='text-error'>{errors?.inStock?.message}</span>
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
