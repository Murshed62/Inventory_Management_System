import { useForm, Controller } from 'react-hook-form';
import useLogin from './useLogin';
import InputPassword from '../../UI/InputPassword';
import useUser from './useUser';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { onsubmitHandler, isLoading } = useLogin();
  const { isAuthenticated } = useUser();
  if (isAuthenticated) return <Navigate to='/' />;
  return (
    <div className='card bg-base-100 w-full md:w-1/3 mt-5 shadow-md'>
      <form
        onSubmit={handleSubmit(onsubmitHandler)}
        className='card-body flex flex-col gap-5'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Email Address</label>
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
          <label htmlFor='password'>Password</label>
          <Controller
            name='password'
            defaultValue=''
            control={control}
            render={({ field }) => (
              <InputPassword
                {...field}
                disabled={isLoading}
                id='password'
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
        <button disabled={isLoading} className='btn btn-primary w-full'>
          {isLoading ? (
            <span className='loading loading-infinity loading-md text-secondary'></span>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
