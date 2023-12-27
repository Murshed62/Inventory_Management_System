import { useSearchParams } from 'react-router-dom';

const SortBy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get('sortBy');
  const onSelect = (e) => {
    const value = e.target.value;
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
  };
  return (
    <select
      defaultValue={defaultValue}
      className=' select select-primary'
      onChange={onSelect}
    >
      <option value='name-asc'>Sort by name (A - Z)</option>
      <option value='name-desc'>Sort by name (Z - A)</option>
      <option value='unitPrice-asc'>Sort by price (low - high)</option>
      <option value='unitPrice-desc'>Sort by price (high - low)</option>
      <option value='inStock-asc'>Sort by stock (low - high)</option>
      <option value='inStock-desc'>Sort by stock (high - low)</option>
      <option value='createdAt-desc'>Sort by added (earlier first)</option>
      <option value='createdAt-asc'>Sort by added (later first)</option>
    </select>
  );
};

export default SortBy;
