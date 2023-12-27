import { useSearchParams } from 'react-router-dom';
import Select from '../../UI/Select';
import useCategories from '../Category/useCategories';

const FilterByCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading: isCategoryLoading, categories } = useCategories(true); // get only names
  const defaultValue = searchParams.get('category');

  const onSelectHandler = (item) => {
    searchParams.delete('search');
    searchParams.set('category', item.value);
    setSearchParams(searchParams);
  };
  const options = categories?.length
    ? categories?.map((category) => ({
        label: category.title,
        value: category._id,
      }))
    : [];

  const onClear = () => {
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <Select
      key={categories?.length}
      placeholder='Filter by category'
      isDisabled={isCategoryLoading}
      options={options}
      onSelect={onSelectHandler}
      onClear={onClear}
      defaultValue={defaultValue}
    />
  );
};

export default FilterByCategory;
