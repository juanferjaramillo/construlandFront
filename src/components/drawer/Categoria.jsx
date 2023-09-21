import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Select from "@mui/material/Select";
import CategoryIcon from "@mui/icons-material/Category";
import MenuItem from "@mui/material/MenuItem";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useSelector } from "react-redux";

export default function Categoria(props) {

  const categories = useSelector((state) => state.product.categories);

    return (
       <>
       <ListItem key={"categoria"} sx={{ ml: -2 }}>
          <ListItemButton
            onClick={() => {
              props.setSelectCateg(!props.selectCateg);
              props.setSelectDisp(false);
              props.setSelectProv(false);
              props.setSelectPro(false);
              props.setSearchProd(false);
            }}
          >
            <CategoryIcon sx={{ color:props.colorPrimario }} />
            <ListItemText sx={{ marginLeft: 1 }} primary="Categoria" />
          </ListItemButton>
        </ListItem>

        {!props.selectCateg ? null : (
          <>
            <Select
              name="filtercateg"
              onChange={props.handleFilterCategChange}
              sx={{
                backgroundColor: "whiteSmoke",
                width: "13vw",
                // maxWidth: "80%",
                height: 30,
                mb: 2,
                ml: 1,
                mr: 1,
              }}
              value={props.FBC}
            >
              {categories?.map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </Select>
          </>
        )}

        <Divider />
        </> 
    )
}