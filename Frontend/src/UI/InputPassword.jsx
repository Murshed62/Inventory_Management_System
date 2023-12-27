import { useState, forwardRef } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

const InputPassword = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prevS) => !prevS);

  return (
    <div className=' relative w-full'>
      <input
        ref={ref}
        type={show ? 'text' : 'password'}
        {...props}
        className='input input-bordered input-primary w-full pr-9'
      />
      <span
        onClick={toggleShow}
        className=' absolute z-10 right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl'
      >
        {show ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
      </span>
    </div>
  );
});

InputPassword.displayName = 'InputPassword';

export default InputPassword;
