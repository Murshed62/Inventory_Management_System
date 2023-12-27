import React from 'react';
import toast from 'react-hot-toast';
import Heading from '../../UI/Heading';
import useUpdateSettings from './useUpdateSettings';

const Option = ({ title, description, field, isChecked, value, id }) => {
  const { updateSetting, isLoading } = useUpdateSettings();
  const onToggle = () => {
    const toastId = toast.loading('Updating...');
    updateSetting(
      { id, body: { [field]: !isChecked } },
      {
        onSuccess: () => {
          toast.dismiss(toastId);
        },
      }
    );
  };
  const onBlur = (e) => {
    const toastId = toast.loading('Updating...');
    updateSetting(
      { id, body: { [field]: e.target.value } },
      {
        onSuccess: () => {
          toast.dismiss(toastId);
        },
      }
    );
  };
  return (
    <div className='flex justify-between'>
      <div className=' basis-2/3'>
        <Heading as='h5'>{title}</Heading>
        <p className=' text-muted text-sm'>{description}</p>
      </div>
      {field !== 'maxProductRequest' && (
        <input
          type='checkbox'
          className='toggle toggle-primary toggle-lg'
          defaultChecked={isChecked}
          onChange={onToggle}
          disabled={isLoading}
        />
      )}
      {field === 'maxProductRequest' && (
        <input
          type='number'
          placeholder='0'
          className=' input input-primary w-[100px]'
          defaultValue={value}
          onBlur={onBlur}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default Option;
