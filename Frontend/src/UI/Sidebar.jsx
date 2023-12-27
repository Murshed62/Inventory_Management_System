import Logo from './Logo';
import MainNav from './MainNav';

const Sidebar = () => {
  return (
    <aside className=' row-span-full bg-base-100 text-center border-r border-gray-200 dark:border-gray-600'>
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
