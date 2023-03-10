import React from "react";
import { useSearchParams } from "react-router-dom";
import { ListItemButton, ListItemText, Collapse, List } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FilterCheckBox from "./FilterCheckBox";

const ListItemstyle = {
  borderBottom: "1px solid #CCCCCC",
  paddingTop: "20px",
  paddingBottom: "20px",
};

export default function Brand() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openBrand, setOpenBrand] = React.useState(false);
  const [brand, setBrand] = React.useState({
    IKEA: false,
    CB2: false,
    "Herman Miller": false,
    "Ashley Furniture": false,
  });

  const firstUpdate = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      let params = searchParams.get("brand");
      if (params) {
        let valArray = params.split("_");
        for (let i in valArray) {
          if (brand[valArray[i]] !== undefined) {
            setBrand((prev) => {
              return { ...prev, [valArray[i]]: true };
            });
          }
        }
      }
      return;
    }

    let brandQuery = "";
    for (let i in brand) {
      if (brand[i]) {
        brandQuery = brandQuery + `${i}_`;
      }
    }
    if (brandQuery === "") {
      searchParams.delete("brand");
    } else {
      searchParams.set("brand", brandQuery);
    }
    setSearchParams(searchParams);
  }, [brand, searchParams, setSearchParams]);

  return (
    <>
      <ListItemButton
        style={ListItemstyle}
        onClick={() => setOpenBrand(!openBrand)}
      >
        <ListItemText
          disableTypography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
          primary="Brand"
        />
        {openBrand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openBrand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onChange={(e) => {
              setBrand({
                ...brand,
                IKEA: !brand["IKEA"],
              });
            }}
          >
            <FilterCheckBox label="IKEA" checked={brand["IKEA"]} />
          </ListItemButton>

          <ListItemButton
            onChange={(e) => {
              setBrand({
                ...brand,
                "Herman Miller": !brand["Herman Miller"],
              });
            }}
          >
            <FilterCheckBox
              label="Herman Miller"
              checked={brand["Herman Miller"]}
            />
          </ListItemButton>

          <ListItemButton
            onChange={(e) => {
              setBrand({
                ...brand,
                CB2: !brand["CB2"],
              });
            }}
          >
            <FilterCheckBox label="CB2" checked={brand["CB2"]} />
          </ListItemButton>

          <ListItemButton
            onChange={(e) => {
              setBrand({
                ...brand,
                "Ashley Furniture": !brand["Ashley Furniture"],
              });
            }}
          >
            <FilterCheckBox
              label="Ashley Furniture"
              checked={brand["Ashley Furniture"]}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
