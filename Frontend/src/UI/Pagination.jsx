import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2';

const itemsPerPage = import.meta.env.VITE_RESULT_LIMIT;

const Pagination = ({ totalItems = 0 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = searchParams.get('page') || 1;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    searchParams.set('page', event.selected + 1);
    setSearchParams(searchParams);
  };
  if (!totalItems) return null;

  return (
    <>
      <ReactPaginate
        breakLabel='...'
        nextLabel={<HiMiniChevronRight size={25} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        forcePage={currPage - 1}
        previousLabel={<HiMiniChevronLeft size={25} />}
        renderOnZeroPageCount={null}
        containerClassName='flex items-center gap-2'
        pageLinkClassName='btn btn-circle btn-outline btn-secondary dark:text-inherit'
        previousLinkClassName='btn btn-circle btn-outline btn-secondary dark:text-inherit'
        nextLinkClassName='btn btn-circle btn-outline btn-secondary dark:text-inherit'
        breakLinkClassName='btn btn-circle btn-outline btn-secondary dark:text-inherit'
        activeLinkClassName='btn-active'
        disabledLinkClassName='btn-disabled'
      />
    </>
  );
};

export default Pagination;
