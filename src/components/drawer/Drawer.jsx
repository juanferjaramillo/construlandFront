import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { logout, clearProds } from "../../redux/actions";
import SearchIcon from "@mui/icons-material/Search";

import {
  filterByProvider,
  resetBoard,
  filterByCategory,
  filterByDisponibility,
  filterByProperty,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import Todos from "./Todos";
import Kits from "./Proveedor";
import Disponibilidad from "./Disponibilidad";
import Categoria from "./Categoria";
import Atributos from "./Atributos";

//======================Component===============
export default function DrawerContent() {
  const [FBP, setFBP] = useState(""); //provider
  const [FBC, setFBC] = useState(""); //category
  const [FBD, setFBD] = useState(""); //disponibility
  const [FBPP, setFBPP] = useState([false, false, false, false, false, false]); //property
  const [selectProv, setSelectProv] = useState(false);
  const [searchProd, setSearchProd] = useState(false);
  const [selectCateg, setSelectCateg] = useState(false);
  const [selectDisp, setSelectDisp] = useState(false);
  const [selectPro, setSelectPro] = useState(false);
  const [render, setRender] = useState(true);

  const logoOwner = "https://res.cloudinary.com/sthemma/construland/Logo_Construland.jpg"
  const colorPrimario = `#${useSelector(
    (state) => state.users?.authUser?.owner?.colorPrimario
  )}`;
  const colorSecundario = `#${useSelector(
    (state) => state.users?.authUser?.owner?.colorSecundario
  )}`;
  const cliente = useSelector((state) => state.users?.client?.name);
  const sells = useSelector((state) => state.product?.sell);
  const sellValue = useSelector((state) => state.product?.sellValue);

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //--------------------HANDLERS------------------------
  const handleFilterProviderChange = (event) => {
    dispatch(filterByProvider(event.target.value));
    //to keep the selection box updated
    document.documentElement.scrollTop = 0;
    setFBP(event.target.value);
    //setRender((r) => !r);
  };

  const handleResetClick = () => {
    setFBP("");
    setFBC("");
    setFBD("");
    setFBPP([false, false, false, false, false, false]);
    dispatch(resetBoard());
    document.documentElement.scrollTop = 0;
    //setRender((r) => !r);
  };

  const handleFilterCategChange = (event) => {
    dispatch(filterByCategory(event.target.value));
    //to keep the selection box updated
    document.documentElement.scrollTop = 0;
    setFBC(event.target.value);
    //setRender((r) => !r);
  };
  const handleFilterDispChange = (event) => {
    dispatch(filterByDisponibility(event.target.value));
    document.documentElement.scrollTop = 0;
    setFBD(event.target.value);
    //setRender((r) => !r);
  };

  const handleCheckChange = (event) => {
    dispatch(filterByProperty(event.target.value));
    let checks = FBPP;
    checks[event.target.value - 1] = true;
    setFBPP(checks);
    //setRender((r) => !r);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProds());
    sessionStorage.clear();
    navigate("/");
  };
  //--------------------------------------------------------
  let bShadow = 0;
  let bColor = "";
  cliente ? (bShadow = 4) : (bShadow = 0);
  cliente ? (bColor = colorPrimario) : (bColor = "white");

  //---------------------Render-----------------
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid item>
        <img
          height="55vh"
          width="180vh"
          alt="Logo Cliente"
          src={logoOwner}
          style={{ objectFit: "contain" }}
        ></img>
      </Grid>

      <Divider />

      <List>
        <Todos handleResetClick={handleResetClick} />

        <Categoria
          setSelectCateg={setSelectCateg}
          selectCateg={selectCateg}
          setSelectDisp={setSelectDisp}
          setSelectProv={setSelectProv}
          setSelectPro={setSelectPro}
          setSearchProd={setSearchProd}
          colorPrimario={colorPrimario}
          handleFilterCategChange={handleFilterCategChange}
          FBC={FBC}
        />
        
        <Kits
          setSelectProv={setSelectProv}
          selectProv={selectProv}
          setSelectCateg={setSelectCateg}
          setSelectPro={setSelectPro}
          setSelectDisp={setSelectDisp}
          setSearchProd={setSearchProd}
          colorPrimario={colorPrimario}
          handleFilterProviderChange={handleFilterProviderChange}
          FBP={FBP}
        />

        {/* <Disponibilidad
          setSelectDisp={setSelectDisp}
          selectDisp={selectDisp}
          setSelectProv={setSelectProv}
          setSelectCateg={setSelectCateg}
          setSelectPro={setSelectPro}
          setSearchProd={setSearchProd}
          colorPrimario={colorPrimario}
          handleFilterDispChange={handleFilterDispChange}
          FBD={FBD}
        /> */}

        

        {/* <Atributos
          setSelectDisp={setSelectDisp}
          setSelectProv={setSelectProv}
          setSelectPro={setSelectPro}
          selectPro={selectPro}
          setSelectCateg={setSelectCateg}
          setSearchProd={setSearchProd}
          colorPrimario={colorPrimario}
          FBPP={FBPP}
          handleCheckChange={handleCheckChange}
        /> */}

        <Grid
          item
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          color={colorSecundario}
          backgroundColor={bColor}
          boxShadow={bShadow}
          sx={{ width: "90%", height: "25vh", p: 1, m: 1 }}
        >
          {cliente &&
            <>
              <Typography>Pedido de:</Typography>
              <Typography>{cliente}</Typography>
              <Divider />

              {Object.keys(sells).length > 0 &&
                <>
                  <Typography>
                    Productos:{" "}
                    {Object.keys(sells).filter((s) => sells[s] > 0).length}
                  </Typography>
                  <Typography>
                    Unidades: {Object.values(sells)?.reduce((a, x) => a + x)}
                  </Typography>
                </>
              }
              <Divider />
              <Typography>
                Valor: $ {sellValue<1 ? 0 : Math.trunc(sellValue).toLocaleString()}
              </Typography>
            </>
          }
        </Grid>

        {/* <ListItem key={"Salir"}>
          <ListItemButton onClick={handleLogout}>
            <LogoutIcon sx={{ color: colorPrimario }} />
            <ListItemText sx={{ marginLeft: 1 }} primary="Logout" />
          </ListItemButton>
        </ListItem> */}
      </List>
    </Box>
  );
}
