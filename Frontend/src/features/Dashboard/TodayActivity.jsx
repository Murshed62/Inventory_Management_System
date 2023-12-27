import TodayItem from './TodayItem';
import Heading from '../../UI/Heading';
const TodayActivity = () => {
  return (
    <div className='card card-compact bg-base-100 shadow-md flex-1 basis-1/2'>
      <div className='card-body'>
        <Heading as='h4'>Today</Heading>
        <ul className='flex flex-col gap-4'>
          <TodayItem />
          <TodayItem />
          <TodayItem />
          <TodayItem />
        </ul>
      </div>
    </div>
  );
};

export default TodayActivity;
