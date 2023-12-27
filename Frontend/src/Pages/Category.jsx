import Heading from '../UI/Heading';
import CategoryList from '../features/Category/CategoryListTable';
import CategorySearch from '../features/Category/CategorySearch';
import CategoryCreate from '../features/Category/CategoryCreate';
import useCategories from '../features/Category/useCategories';

const Category = () => {
  const { categories, isLoading, searchTerm, onSearch } = useCategories();
  return (
    <>
      <Heading as='h1'>Category</Heading>
      <div className='flex justify-between my-5 flex-col md:flex-row'>
        <CategorySearch onSearch={onSearch} />
        <CategoryCreate />
      </div>
      <CategoryList
        categories={categories}
        isLoading={isLoading}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default Category;
