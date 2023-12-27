import { useSearchParams } from 'react-router-dom';

const Filter = ({ options, filterField }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentField = searchParams.get(filterField) || options.at(0).value;
  const handleClick = (value) => {
    if (searchParams.get('page')) searchParams.set('page', 1);
    if (value === 'all') {
      searchParams.delete(filterField);
    } else {
      searchParams.set(filterField, value);
    }
    setSearchParams(searchParams);
  };
  return (
    <div className='btn-group gap-1'>
      {options.map((option) => (
        <button
          onClick={() => handleClick(option.value)}
          key={option.value}
          className={`btn btn-sm bg-base-300 ${
            currentField === option.value && 'btn-active'
          }`}
          disabled={currentField === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
