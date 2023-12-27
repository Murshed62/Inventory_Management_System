import Filter from '../../UI/Filter';

const RequestsFilter = () => {
  return (
    <Filter
      filterField='status'
      options={[
        {
          value: 'all',
          label: 'All',
        },
        {
          value: 'pending',
          label: 'Pending',
        },
        {
          value: 'accepted',
          label: 'Accepted',
        },
        {
          value: 'rejected',
          label: 'Rejected',
        },
      ]}
    />
  );
};

export default RequestsFilter;
