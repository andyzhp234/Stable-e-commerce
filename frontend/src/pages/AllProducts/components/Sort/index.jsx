import React from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Filter from "../Filter";
import FilterIcon from "../../../../assets/icons/filters.png";
import CloseIcon from "../../../../assets/icons/close.png";

export default function Sort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = React.useState("bestmatch");

  React.useEffect(() => {
    if (searchParams.get("sortBy")) {
      setSort(searchParams.get("sortBy"));
    }
  }, [searchParams]);

  const sortHandler = (e) => {
    if (e.target.value === "bestmatch") {
      searchParams.delete("sortBy");
    } else {
      searchParams.set("sortBy", e.target.value);
    }
    setSearchParams(searchParams);
  };

  const [openModal, setOpenModal] = React.useState(false);

  return (
    <div className="allproducts__filters">
      <select
        name="sort"
        id="sort"
        className="filter_box"
        onChange={sortHandler}
        value={sort}
      >
        <option value="bestmatch">Sort By: Best Match</option>
        <option value="ascprice">Sort By: Price Low To High</option>
        <option value="descprice">Sort By: Price High To Low</option>
        <option value="rating">Sort By: Customer Rating</option>
      </select>

      <img
        id="filter"
        src={FilterIcon}
        alt=""
        onClick={() => setOpenModal(true)}
      />
      <Modal
        open={openModal}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div className="filter-modal">
          <div className="filter-modal__container">
            <img
              style={{
                width: "30px",
                height: "30px",
              }}
              src={CloseIcon}
              alt="close_modal"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <Filter />
        </div>
      </Modal>
    </div>
  );
}
