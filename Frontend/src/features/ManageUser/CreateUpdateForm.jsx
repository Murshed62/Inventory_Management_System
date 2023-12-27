import { useForm, Controller } from 'react-hook-form';
import InputPassword from '../../UI/InputPassword';
import useCreateUser from './useCreateUser';
import useUpdateUser from './useUpdateUser';
import allDepartment from '../../data/allDepartment';

const CreateUpdateForm = ({ onCloseModal, editUser = {} }) => {
  const { _id, ...editValues } = editUser || {};
  const isEditSession = Boolean(_id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  //   const { onsubmitHandler, isLoading } = useLogin();
  const { createUser, isLoading: isCreating } = useCreateUser(reset);
  const { updateUser, isLoading: isUpdating } = useUpdateUser();

  const isLoading = isCreating || isUpdating;

  const submitHandler = (data) => {
    if (isEditSession) return updateUser({ id: _id, body: data });
    createUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='flex flex-col gap-5'
    >
      <div className='flex flex-col gap-1'>
        <label htmlFor='fullName'>Full Name</label>
        <input
          disabled={isLoading}
          id='fullName'
          type='text'
          placeholder='Enter full name'
          className='input input-bordered input-primary w-full'
          {...register('fullName', {
            required: 'Full name is required',
            validate: (value) => value.trim()?.length > 0 || 'Invalid input',
          })}
        />
        {errors?.fullName?.message && (
          <span className='text-error'>{errors?.fullName?.message}</span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='email'>Email address</label>
        <input
          disabled={isLoading}
          id='email'
          type='text'
          placeholder='Enter your email'
          className='input input-bordered input-primary w-full'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors?.email?.message && (
          <span className='text-error'>{errors?.email?.message}</span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='department'>Department</label>
        <select
          name='department'
          className='select select-primary w-full'
          {...register('department', {
            required: 'Department name is required',
          })}
        >
          {allDepartment.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors?.department?.message && (
          <span className='text-error'>{errors?.department?.message}</span>
        )}
      </div>
      {!isEditSession && (
        <>
          <div className='flex flex-col gap-1'>
            <label htmlFor='passowrd'>Passoword</label>
            <Controller
              name='password'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <InputPassword
                  {...field}
                  disabled={isLoading}
                  id='passowrd'
                  placeholder='Enter your password'
                />
              )}
              rules={{
                required: 'Password is required',
                validate: (value) =>
                  value.length >= 8
                    ? true
                    : 'Password must be at least 8 characters long',
              }}
            />

            {errors?.password?.message && (
              <span className='text-error'>{errors?.password?.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='passwordConfirm'>Confirm password</label>
            <Controller
              name='passwordConfirm'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <InputPassword
                  {...field}
                  disabled={isLoading}
                  id='passwordConfirm'
                  placeholder='Confirm your password'
                />
              )}
              rules={{
                required: 'Confirm password is required',
                validate: (value) =>
                  value === watch().password || 'Password did not match',
              }}
            />

            {errors?.passwordConfirm?.message && (
              <span className='text-error'>
                {errors?.passwordConfirm?.message}
              </span>
            )}
          </div>
        </>
      )}

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
