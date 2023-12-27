import {
  HiOutlineCurrencyBangladeshi,
  HiOutlineCodeBracket,
  HiOutlineFingerPrint,
  HiOutlineAcademicCap,
} from 'react-icons/hi2';
import Stat from './Stat';

const Stats = () => {
  return (
    <div className='flex gap-4 justify-center flex-wrap'>
      <Stat
        icon={
          <HiOutlineCurrencyBangladeshi className='text-primary' size={50} />
        }
        value='33k'
        title='Total cost'
        colorBg='var(--color-primary-100)'
      />
      <Stat
        icon={<HiOutlineCodeBracket className='text-success' size={50} />}
        value='33k'
        title='Total cost'
        colorBg='var(--color-success-100)'
      />
      <Stat
        icon={<HiOutlineFingerPrint className='text-nutral' size={50} />}
        value='33k'
        title='Total cost'
        colorBg='var(--color-nutral-100)'
      />
      <Stat
        icon={<HiOutlineAcademicCap className='text-pink' size={50} />}
        value='33k'
        title='Total Products'
        colorBg='var(--color-pink-100)'
      />
    </div>
  );
};

export default Stats;
