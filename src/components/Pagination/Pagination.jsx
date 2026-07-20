import './Pagination.scss'

export default function Pagination({
    page,
    totalPages,
    onPrev,
    onNext,
    onPageChange
}) {

    const items = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            items.push(i);
        }
    } else if (page <= 4) {
        items.push(1, 2, 3, 4, 5, 6, '...', totalPages);
    } else if (page >= totalPages - 3) {
        items.push(
            1,
            '...',
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
        );
    } else {
        items.push(
            1,
            '...',
            page - 2,
            page - 1,
            page,
            page + 1,
            page + 2,
            '...',
            totalPages
        );
    }

    return (
        <div className="pagination">
            <button 
                className="pagination__button"
                onClick={onPrev}
                disabled={page === 1}
            >
                Prev
            </button>

            {items.map((item, index) =>
                item === '...' ? (
                    <span
                        key={`dots-${index}`}
                        className="pagination__dots"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={item}
                        onClick={() => onPageChange(item)}
                        className={page === item ? 'pagination__button active' : 'pagination__button'}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                className="pagination__button"
                onClick={onNext}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
}
