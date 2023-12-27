import Heading from '../UI/Heading';
import InventoryList from '../features/Inventory/InventoryListTable';
import InventorySearch from '../features/Inventory/InventorySearch';
import InventoryCreate from '../features/Inventory/InventoryCreate';
import useInventories from '../features/Inventory/useInventories';
import FilterByCategory from '../features/Inventory/FilterByCategory';
import SortBy from '../features/Inventory/SortBy';
import Pagination from '../UI/Pagination';
import useAuth from '../hooks/useAuth';

const Inventory = () => {
  const { isSuperAdmin } = useAuth();
  const { inventories, isLoading, totalDoc = 0 } = useInventories();
  return (
    <>
      <Heading as='h1'>Inventory</Heading>
      <div className='flex justify-between my-5 flex-col md:flex-row'>
        <InventorySearch isLoading={isLoading} />
        <div className='flex items-center gap-2'>
          <FilterByCategory />
          <SortBy />
          {isSuperAdmin && <InventoryCreate />}
        </div>
      </div>
      <InventoryList inventories={inventories} isLoading={isLoading} />
      <div className=' flex justify-center items-center my-5'>
        <Pagination itemsPerPage={10} totalItems={totalDoc} />
      </div>
    </>
  );
};

export default Inventory;
