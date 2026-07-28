import ReactPaginateModule from 'react-paginate';
import './Pagination.scss';

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}) {

    const ReactPaginate = ReactPaginateModule.default;

    function handlePageClick(event) {
        onPageChange(event.selected + 1)
    }

    return (
        <ReactPaginate
            breakLabel='...'
            nextLabel='>' //
            previousLabel='<'
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            forcePage={page - 1}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}

            containerClassName="pagination"
            pageClassName="pagination__item"
            pageLinkClassName="pagination__link"
            activeClassName="pagination__item--active"
            previousClassName="pagination__item"
            nextClassName="pagination__item"
            disabledClassName="pagination__item--disabled"
            breakClassName="pagination__item"
            breakLinkClassName="pagination__link"
        />
    )
}