import { useForm } from 'react-hook-form';
import useUpdateMe from './useUpdateMe';
import useUser from '../Authentication/useUser';

const InfoChangeForm = () => {
  const { user } = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
    },
  });
  const { update, isLoading } = useUpdateMe();
  return (
    <div className='card card-compact md:card-normal bg-base-100 w-full md:w-[500px] shadow-md mt-5'>
      <form
        className='card-body flex flex-col gap-5'
        onSubmit={handleSubmit(update)}
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='name'>Full name</label>
          <input
            disabled={isLoading}
            id='name'
            type='text'
            placeholder='Enter your full name'
            className='input input-bordered input-primary w-full'
            {...register('fullName', {
              required: 'Full name is required',
              validate: (value) =>
                value?.trim()?.length >= 3 ||
                'Full name must be 3 or more character',
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
        <button disabled={isLoading} className='btn btn-primary w-fit'>
          {isLoading ? (
            <span className='loading loading-infinity loading-md text-secondary'></span>
          ) : (
            'Update'
          )}
        </button>
      </form>
    </div>
  );
};

export default InfoChangeForm;
