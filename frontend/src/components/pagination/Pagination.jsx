import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const Pagination = ({ onChangePage, pageCount }) => {
  return (
    <ReactPaginate
      className="root"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
