import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import Tag from '../../UI/Tag';
const TodayItem = () => {
  return (
    <li className='flex items-center gap-2 justify-between'>
      <Tag type='success'>accepted</Tag>
      <span>Marker pen</span>
      <span className='flex items-center'>
        3,00 <FaBangladeshiTakaSign size={10} />
      </span>
      <button className='btn btn-xs btn-secondary'>Accept</button>
    </li>
  );
};

export default TodayItem;
