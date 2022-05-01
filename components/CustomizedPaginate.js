import React from "react";
import ReactPaginate from "react-paginate";

const CustomizedPaginate = ({ setPage, pageCount, pageRangeDisplayed }) => {
    const onPageChange = (e) => {
        setPage(e.selected + 1);
    }
    return (
        <ReactPaginate
            className="flex justify-center space-x-4"
            breakLabel="..."
            nextLabel=">"
            onPageChange={onPageChange}
            pageRangeDisplayed={pageRangeDisplayed}
            marginPagesDisplayed={0}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            >
        </ReactPaginate>
    );
}

export default CustomizedPaginate;