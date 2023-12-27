import DeptAssignChart from './DeptAssignChart';
import DeptCostChart from './DeptCostChart';
import Stats from './Stats';
import TodayActivity from './TodayActivity';

const DashboardLayout = () => {
  return (
    <div className='flex flex-col gap-5'>
      <Stats />
      <div className='flex gap-5 flex-col md:flex-row'>
        <TodayActivity />
        <DeptCostChart />
      </div>
      <DeptAssignChart />
    </div>
  );
};

export default DashboardLayout;
