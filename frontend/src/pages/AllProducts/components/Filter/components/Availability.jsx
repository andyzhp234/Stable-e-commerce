import React from "react";
import { ListItemButton, ListItemText, Collapse, List } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FilterCheckBox from "./FilterCheckBox";
import { useSearchParams } from "react-router-dom";

const ListItemstyle = {
  borderBottom: "1px solid #CCCCCC",
  paddingTop: "20px",
  paddingBottom: "20px",
};

export default function Availability() {
  const [searchParams, setSearchParams] = useSearchParams();

  // React State
  const [openInStock, setOpenInStock] = React.useState(false);
  const [inStock, setInStock] = React.useState(() => {
    if (searchParams.get("inStock") !== null) {
      return searchParams.get("inStock") === "true";
    } else {
      return false;
    }
  });

  const firstUpdate = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (inStock) {
      searchParams.set("inStock", inStock);
    } else {
      searchParams.delete("inStock");
    }
    setSearchParams(searchParams);
  }, [inStock, searchParams, setSearchParams]);

  return (
    <>
      <ListItemButton
        style={ListItemstyle}
        onClick={() => setOpenInStock(!openInStock)}
      >
        <ListItemText
          disableTypography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
          primary="Availability"
        />
        {openInStock ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openInStock} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onChange={(e) => {
              setInStock(!inStock);
            }}
          >
            <FilterCheckBox label="In Stock Only" checked={inStock} />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
