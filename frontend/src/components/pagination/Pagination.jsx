import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { ChevronLeft, ChevronRight, Ellipsis  } from 'lucide-react';

const Pagination = ({ onChangePage, pageCount }) => {
  return (
      <ReactPaginate
          className="root"
          breakLabel={<Ellipsis size={16} />}
          nextLabel={<ChevronRight size={16} />}
          previousLabel={<ChevronLeft size={16} />}
          onPageChange={(event) => onChangePage(event.selected + 1)}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
      />
  );
};

export default Pagination;