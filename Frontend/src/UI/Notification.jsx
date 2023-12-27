import { HiOutlineBell } from 'react-icons/hi2';
import RequestCard from './RequestCard';
const Notification = () => {
  return (
    <details className='dropdown dropdown-end'>
      <summary className='btn btn-square btn-ghost'>
        <div className=' indicator'>
          <span className='indicator-item badge badge-error'>99+</span>
          <span className='btn btn-square btn-sm btn-ghost hover:bg-inherit'>
            <HiOutlineBell title='Notification' size={25} />
          </span>
        </div>
      </summary>

      <ul
        className='mt-3 z-[1] p-2 shadow dropdown-content 
        bg-base-200 rounded-box w-full
         md:w-[400px] max-h-[500px] overflow-auto flex flex-col gap-2'
      >
        <li>
          <RequestCard showImage={false} />
        </li>
        <li>
          <RequestCard showImage={false} />
        </li>
        <li>
          <RequestCard showImage={false} />
        </li>
      </ul>
    </details>
  );
};

export default Notification;
