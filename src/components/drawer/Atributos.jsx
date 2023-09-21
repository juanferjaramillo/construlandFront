import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import FormGroup from "@mui/material/FormGroup";
import Select from "@mui/material/Select";
import CategoryIcon from "@mui/icons-material/Category";
import MenuItem from "@mui/material/MenuItem";
import ClassIcon from "@mui/icons-material/Class";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Atributos(props) {
    return (
        <>
        <ListItem key={"atributos"} sx={{ ml: -2 }}>
          <ListItemButton
            onClick={() => {
                props.setSelectPro(!props.selectPro);
                props.setSelectDisp(false);
                props.setSelectProv(false);
                props.setSelectCateg(false);
                props.setSearchProd(false);
            }}
          >
            <ClassIcon sx={{ color: props.colorPrimario }} />
            <ListItemText sx={{ marginLeft: 1 }} primary="Atributos" />
          </ListItemButton>
        </ListItem>

        <FormGroup sx={{ ml: 2 }}>
          {!props.selectPro ? null : (
            <Grid container>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.FBPP[0]}
                    onChange={props.handleCheckChange}
                    value="1"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Keto"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.FBPP[1]}
                    onChange={props.handleCheckChange}
                    value="2"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Vegano"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.FBPP[2]}
                    onChange={props.handleCheckChange}
                    value="3"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Vegetariano"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.FBPP[3]}
                    onChange={props.handleCheckChange}
                    value="4"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Apto Diabéticos"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.FBPP[4]}
                    onChange={props.handleCheckChange}
                    value="5"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Alto Proteína"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.FBPP[5]}
                    onChange={props.handleCheckChange}
                    value="6"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Gluten Free"
              />
            </Grid>
          )}
        </FormGroup>

        <Divider sx={{ mb: 3 }} />
        </>
    )
}