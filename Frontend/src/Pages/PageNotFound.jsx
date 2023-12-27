import { HiArrowLongLeft } from 'react-icons/hi2';
import useMoveBack from '../hooks/useMoveBack';

const PageNotFound = () => {
  const moveBack = useMoveBack();
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-base-200'>
      <div className='bg-base-100 card'>
        <div className='card-body flex flex-col gap-5 justify-center items-center'>
          <h2 className=' card-title'>
            The page you are looking for could not be found 😢
          </h2>
          <button onClick={moveBack} className=' btn btn-secondary btn-sm'>
            <HiArrowLongLeft size={30} /> Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
