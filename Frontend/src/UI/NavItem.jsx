import { NavLink } from 'react-router-dom';
import Tag from './Tag';
const NavItem = ({ icon, label, path, countPending = 0 }) => {
  return (
    <li>
      <NavLink
        to={`/${path}`}
        className={`flex items-center gap-2 w-full 
            mx-auto   py-2 
             duration-150 hover:text-primary opacity-80 pl-10`}
      >
        {icon}
        <span className=' flex items-center gap-1'>
          {label}
          {label === 'Requests' && countPending > 0 && (
            <Tag type='error'>{countPending}</Tag>
          )}
        </span>
      </NavLink>
    </li>
  );
};

export default NavItem;
