import useAuth from '../../hooks/useAuth';
import InventoryRow from './InventoryRow';
import useSettings from '../Settings/useSettings';

const InventoryListTable = ({ inventories = [], isLoading = false }) => {
  const { isSuperAdmin } = useAuth();
  const { settings } = useSettings(isSuperAdmin); // don't call when super admin
  return (
    <div className='card shadow-md bg-base-100'>
      <div className='card-body overflow-x-auto flex justify-center items-center min-h-[300px]'>
        {isLoading ? (
          <span className='loading loading-infinity loading-lg'></span>
        ) : (
          <table className='table table-zebra'>
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Unit price</th>
                <th>In stock</th>
                <th>Created at</th>
                {isSuperAdmin && <th></th>}

                <th></th>
              </tr>
            </thead>
            <tbody>
              {inventories.map((inventory, index) => (
                <InventoryRow
                  key={inventory._id}
                  index={index}
                  inventory={inventory}
                  isEnable={settings?.request}
                />
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InventoryListTable;
