import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = () => {
  return (
    <div
      className='max-w-full grid 
    grid-rows-[auto_1fr] grid-cols-[16.25rem_1fr] h-screen'
    >
      <Header />
      <Sidebar />
      <main className='bg-base-200 overflow-scroll'>
        <div className=' mx-auto p-5'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
