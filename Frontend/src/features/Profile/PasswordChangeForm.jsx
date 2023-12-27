import { useForm, Controller } from 'react-hook-form';
import useUpdatePassword from './useUpdatePassword';
import InputPassword from '../../UI/InputPassword';
import useSettings from '../Settings/useSettings';
import useAuth from '../../hooks/useAuth';

const PasswordChangeForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    reset,
  } = useForm();
  const { updatePassword, isLoading } = useUpdatePassword(reset);
  const { isSuperAdmin } = useAuth();
  const { settings } = useSettings(isSuperAdmin);

  return (
    <div
      className='card card-compact md:card-normal bg-base-100 w-full 
    md:w-[500px] shadow-md relative'
    >
      {!isSuperAdmin && !settings?.passwordChange && (
        <div className=' absolute top-0 z-10 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-md'>
          <p className='text-white'>Super admin disabled this action.</p>
        </div>
      )}
      <form
        className='card-body flex flex-col gap-5'
        onSubmit={handleSubmit(updatePassword)}
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='passwordCurrent'>Current password</label>
          <Controller
            name='passwordCurrent'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <InputPassword
                {...field}
                disabled={isLoading}
                id='passwordCurrent'
                placeholder='Enter your current password'
              />
            )}
            rules={{
              required: 'Current password is required',
            }}
          />

          {errors?.passwordCurrent?.message && (
            <span className='text-error'>
              {errors?.passwordCurrent?.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>New password</label>
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <InputPassword
                {...field}
                disabled={isLoading}
                id='password'
                placeholder='Enter your new password'
              />
            )}
            rules={{
              required: "What's your new password",
              validate: (value) =>
                value.length >= 8 ||
                'Password must be at least 8 characters long',
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
              required: 'Conrim password is required',
              validate: (value) =>
                value === watch('password') || 'password did not match',
            }}
          />

          {errors?.passwordConfirm?.message && (
            <span className='text-error'>
              {errors?.passwordConfirm?.message}
            </span>
          )}
        </div>

        <button disabled={isLoading} className='btn btn-primary w-fit'>
          {isLoading ? (
            <span className='loading loading-infinity loading-md text-secondary'></span>
          ) : (
            'Update password'
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
