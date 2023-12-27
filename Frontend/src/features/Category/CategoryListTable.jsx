import React from 'react';
import CategoryRow from './CategoryRow';

const CategoryListTable = ({
  categories = [],
  isLoading = false,
  searchTerm,
}) => {
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
                <th>Title</th>
                <th>Number of</th>
                <th>Role</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <CategoryRow
                  key={category._id}
                  index={index}
                  searchTerm={searchTerm}
                  category={category}
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

export default CategoryListTable;
