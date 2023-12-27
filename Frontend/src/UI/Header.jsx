import {
  HiArrowRightOnRectangle,
  HiOutlineUser,
  HiOutlineWrenchScrewdriver,
  HiOutlineMoon,
  HiOutlineSun,
} from 'react-icons/hi2';
// import Notification from './Notification';
import useLogout from '../features/Authentication/useLogout';
import Dropdown from './DropDown';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useDarkMode } from '../context/DarkModeContext';

const Header = () => {
  const { isSuperAdmin } = useAuth();
  const { logout } = useLogout();
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  return (
    <header
      className=' bg-base-100 navbar justify-end py-3 items-center border-b 
    border-gray-200 dark:border-gray-600'
    >
      <div className='gap-4'>
        {/* <Notification /> */}
        <Dropdown id='second'>
          <Dropdown.Label classNames='btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src='user.jpeg' />
            </div>
          </Dropdown.Label>
          <Dropdown.Body>
            <li>
              <Link to='profile' className=' items-center'>
                <HiOutlineUser size={20} /> Profile
              </Link>
            </li>
            {isSuperAdmin && (
              <li>
                <Link to='settings'>
                  <HiOutlineWrenchScrewdriver size={20} />
                  Settings
                </Link>
              </li>
            )}

            <li>
              <a onClick={logout}>
                <HiArrowRightOnRectangle size={20} />
                Logout
              </a>
            </li>
          </Dropdown.Body>
        </Dropdown>
        <button onClick={toggleDarkMode} className='btn btn-square'>
          {isDarkMode ? (
            <HiOutlineSun size={22} />
          ) : (
            <HiOutlineMoon size={22} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
