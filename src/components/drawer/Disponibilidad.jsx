import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useSelector } from "react-redux";

export default function Disponibilidad(props) {
  return (
    <>
      <ListItem key={"disponibilidad"} sx={{ ml: -2 }}>
        <ListItemButton
          onClick={() => {
            props.setSelectDisp(!props.selectDisp);
            props.setSelectProv(false);
            props.setSelectCateg(false);
            props.setSelectPro(false);
            props.setSearchProd(false);
          }}

        >
          <InventoryIcon sx={{ color: props.colorPrimario }} />
          <ListItemText sx={{ marginLeft: 1 }} primary="Disponibilidad" />
        </ListItemButton>
      </ListItem>

      {!props.selectDisp ? null : (
        <ListItem key={"dispList"} disablePadding>
          <Select
            name="filterDisp"
            onChange={props.handleFilterDispChange}
            sx={{
              backgroundColor: "whiteSmoke",
              width: "90%",
              height: 30,
              mb: 2,
              ml: 1,
              mr: 1,
            }}
            value={props.FBD}
          >
            {["Llegado", "Agotado", "limitado"].map((d, i) => (
              <MenuItem key={i} value={i + 2}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </ListItem>
      )}

      <Divider />
    </>
  );
}
