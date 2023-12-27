import { useEffect, useState } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';

const InventorySearch = ({ isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState('');
  const searchTerm = searchParams.get('search');
  useEffect(() => {
    if (searchTerm) setValue(searchTerm);
    else setValue('');
  }, [searchTerm]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    searchParams.delete('category');
    if (searchParams.get('page')) searchParams.set('page', 1);
    if (value) searchParams.set('search', value);
    else searchParams.delete('search');
    setSearchParams(searchParams);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex gap-2 items-center basis-full md:basis-1/3 relative'
    >
      <input
        type='text'
        placeholder='Title'
        className='input input-bordered input-primary w-full pr-10'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className='text-gray-400 absolute top-1/2 right-2 -translate-y-1/2'>
        {isLoading && searchTerm ? (
          <span className='loading loading-ring loading-md'></span>
        ) : (
          <HiOutlineMagnifyingGlass size={30} />
        )}
      </span>
    </form>
  );
};

export default InventorySearch;
