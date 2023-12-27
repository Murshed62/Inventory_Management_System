import { useSearchParams } from 'react-router-dom';
import allDepartment from '../../data/allDepartment';
import Select from '../../UI/Select';

const SortBy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get('department') || 'select';
  const onSelect = ({ value }) => {
    searchParams.set('department', value);
    setSearchParams(searchParams);
  };

  const onClear = () => {
    searchParams.delete('department');
    setSearchParams(searchParams);
  };

  return (
    <Select
      width={300}
      defaultValue={defaultValue}
      onClear={onClear}
      onSelect={onSelect}
      options={allDepartment.map((dept) => ({ label: dept, value: dept }))}
      placeholder='Select department'
    />
  );
};

export default SortBy;
