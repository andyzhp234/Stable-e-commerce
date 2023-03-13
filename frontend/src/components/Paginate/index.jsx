import React from "react";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

export default function Paginate({ page, pages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginateHandler = (e, value) => {
    window.scrollTo(0, 0);
    searchParams.set("currPage", value);
    setSearchParams(searchParams);
  };

  React.useEffect(() => {
    if (page > pages) {
      searchParams.set("currPage", pages);
      setSearchParams(searchParams);
    }
  }, [page, pages, setSearchParams, searchParams]);

  return (
    <div className="paginate">
      <Pagination
        count={pages ? pages : 1}
        page={page ? page : 1}
        size="medium"
        color="primary"
        onChange={paginateHandler}
      />
    </div>
  );
}
