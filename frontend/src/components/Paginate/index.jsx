import React from "react";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

export default function Paginate({ page, pages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  const paginateHandler = (e, value) => {
    window.scrollTo(0, 0);
    setSearchParams({ ...params, currPage: value });
  };
  return (
    <div className="paginate">
      <Pagination
        count={pages ? pages : 1}
        page={page ? page : 1}
        size="large"
        color="primary"
        onChange={paginateHandler}
      />
    </div>
  );
}
