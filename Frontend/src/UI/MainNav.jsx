import { useQuery } from '@tanstack/react-query';
import {
  HiOutlineCube,
  HiOutlineTruck,
  HiOutlineUserGroup,
  HiOutlineSwatch,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';
import { countPending as countPendingApi } from '../services/apiRequest';
import NavItem from './NavItem';
import useAuth from '../hooks/useAuth';

const MainNav = () => {
  const { isSuperAdmin } = useAuth();
  const { data: countPending } = useQuery({
    queryKey: ['count-pending'],
    queryFn: countPendingApi,
    enabled: isSuperAdmin,
  });
  return (
    <nav className='mt-10'>
      <ul className='flex flex-col gap-4'>
        <NavItem
          icon={<HiOutlineCube className=' duration-100' size={30} />}
          label='Inventory'
          path='inventory'
        />
        {isSuperAdmin && (
          <NavItem
            icon={<HiOutlineSwatch className=' duration-100' size={30} />}
            label='Categories'
            path='category'
          />
        )}

        <NavItem
          icon={<HiOutlineTruck className=' duration-100' size={30} />}
          label='Requests'
          path='requests'
          countPending={countPending}
        />
        {isSuperAdmin && (
          <NavItem
            icon={<HiOutlineUserGroup className=' duration-100' size={30} />}
            label='Manage User'
            path='manage-user'
          />
        )}
        {isSuperAdmin && (
          <NavItem
            icon={
              <HiOutlineWrenchScrewdriver className=' duration-100' size={30} />
            }
            label='Settings'
            path='settings'
          />
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
