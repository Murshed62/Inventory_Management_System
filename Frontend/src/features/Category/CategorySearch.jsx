import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const CategorySearch = ({ onSearch }) => {
  return (
    <div className='flex gap-2 items-center basis-full md:basis-1/3 relative'>
      <input
        type='text'
        placeholder='Title'
        className='input input-bordered input-primary w-full pr-10'
        onChange={onSearch}
      />

      <HiOutlineMagnifyingGlass
        size={30}
        className='text-gray-400 absolute top-1/2 right-2 -translate-y-1/2'
      />
    </div>
  );
};

export default CategorySearch;
