import React from "react";
import ReactPaginate from "react-paginate";

const CustomizedPaginate = ({ setPage, pageCount }) => {
    const onPageChange = (e) => {
        setPage(e.selected + 1);
    }
    return (
        <ReactPaginate
            className="flex justify-center space-x-4"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={onPageChange}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            >
        </ReactPaginate>
    );
}

export default CustomizedPaginate;