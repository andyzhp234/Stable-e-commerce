import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  TextField,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const ListItemstyle = {
  borderBottom: "1px solid #CCCCCC",
  paddingTop: "20px",
  paddingBottom: "20px",
};

export default function Price() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openPrice, setOpenPrice] = React.useState(false);
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  const priceHandler = () => {
    if (minPrice) {
      searchParams.set("minPrice", minPrice);
    } else {
      searchParams.delete("minPrice");
    }
    if (maxPrice) {
      searchParams.set("maxPrice", maxPrice);
    } else {
      searchParams.delete("maxPrice");
    }
    setSearchParams(searchParams);
  };

  const firstUpdate = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      let minParams = searchParams.get("minPrice");
      let maxParams = searchParams.get("maxPrice");
      if (minParams) {
        setMinPrice(parseInt(minParams));
      }
      if (maxParams) {
        setMaxPrice(parseInt(maxParams));
      }
      return;
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <ListItemButton
        style={ListItemstyle}
        onClick={() => setOpenPrice(!openPrice)}
      >
        <ListItemText
          disableTypography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
          primary="Price"
        />
        {openPrice ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openPrice} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                priceHandler();
              }
            }}
          >
            <ListItemButton>
              <TextField
                onChange={(e) => setMinPrice(e.target.value)}
                label="Min"
                variant="outlined"
                sx={{ mr: 2, mt: 1 }}
                value={minPrice}
              />
              <div>to</div>
              <TextField
                onChange={(e) => setMaxPrice(e.target.value)}
                label="Max"
                variant="outlined"
                sx={{ ml: 2, mt: 1 }}
                value={maxPrice}
              />
            </ListItemButton>
          </form>
        </List>
      </Collapse>
    </>
  );
}
