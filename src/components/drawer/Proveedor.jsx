import ListItemButton from "@mui/material/ListItemButton";
import WorkIcon from "@mui/icons-material/Work";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";

export default function Kits(props) {
  const providers = useSelector((state) => state.product.providers);

  return (
    <>
      <ListItem key={"kits"} sx={{ ml: -2 }}>
        <ListItemButton
          onClick={() => {
            props.setSelectProv(!props.selectProv);
            props.setSelectCateg(false);
            props.setSelectPro(false);
            props.setSelectDisp(false);
            props.setSearchProd(false);
          }}
        >
          <WorkIcon sx={{ color: props.colorPrimario }} />
          <ListItemText sx={{ marginLeft: 1 }} primary="Set" />
        </ListItemButton>
      </ListItem>

      {!props.selectProv ? null : (
        <>
          <ListItem key={"provList"} disablePadding>
            <Select
              name="filterProvider"
              onChange={props.handleFilterProviderChange}
              sx={{
                backgroundColor: "whiteSmoke",
                width: "150px",
                height: 30,
                mb: 2,
                ml: 1,
                mr: 1,
                fontSize: 12,
              }}
              value={props.FBP}
            >
              {providers?.map((p, i) => {
                return (
                  <MenuItem key={i} value={p}>
                    {p}
                  </MenuItem>
                );
              })}
            </Select>
          </ListItem>
        </>
      )}
      <Divider />
    </>
  );
}
