import DashboardLayout from '../features/Dashboard/DashboardLayout';
import DashboardFilter from '../features/Dashboard/DashboardFilter';
import Heading from '../UI/Heading';

const Dashboard = () => {
  return (
    <>
      <div className='flex justify-between items-center mb-5 flex-col gap-4 md:flex-row'>
        <Heading as='h1'>Dashboard</Heading>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </>
  );
};

export default Dashboard;
