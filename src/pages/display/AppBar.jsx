import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { filterByName } from "../../redux/actions";
import { lightGreen } from "@mui/material/colors";

//============================COMPONENT==========================
export default function Appbar(props) {
  const [render, setRender] = useState(true);

  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleInput = (event) => {
    inputRef.current.value = event.target.value.trim().toLowerCase();
  };

  const handleBuscarClick = () => {
    dispatch(filterByName(inputRef.current.value ));
    inputRef.current.value = "";
    document.documentElement.scrollTop = 0;
    // setRender((r) => !r);
  };

  const handleKeySearch = (event) => {
    if (event.key === "Enter") {
      handleBuscarClick();
    }
  };

  //---------------------render------------------------
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100vw - ${props.drawerWidth}px)` },
        ml: { md: `${props.drawerWidth}px` },
        height: "64px",
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: "red",
          width: { md: `calc(100vw - ${props.drawerWidth}px)` },
        }}
      >
        <Grid
          item
          display={"flex"}
          flexDirection={"column"}
          sx={{ width: "100%" }}
        >
          <Grid
            item
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}

            // sx={{width: { md: `calc(100vw - ${props.drawerWidth}px)` }}}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              sx={{ ml: 1, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Grid
              item
              display={"Flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              // border={1}
              sx={{ width: 1500 }}
            >
              <Grid item>
                <Typography
                  // variant="h6"
                  component="div"
                  sx={{ fontSize: { xs: "00%", sm: "100%", md: "160%" } }}
                >
                 Construye tu mundo
                </Typography>
              </Grid>
          

              <Grid
                item
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"20vw"}
              >
                <Input
                  placeholder="Producto"
                  sx={{ height: 30, mr: 3, color:"black" }}
                  type="text"
                  inputRef={inputRef}
                  onChange={handleInput}
                  onKeyPress={handleKeySearch}
                ></Input>
                <Grid
                  item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={40}
                  height={40}
                  border={1}
                  borderColor={"darkGray"}
                  borderRadius={"50%"}
                >
                  <SearchIcon
                    sx={{ color: "darkGray" }}
                    onClick={handleBuscarClick}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
