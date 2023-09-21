import { Box, Grid, Typography, Divider, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { margin } from "@mui/system";
import ChangeCart from "./ChangeCart";

let colorD = "white";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: colorD,
    color: colorD,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const colorsDot = (id) => {
  switch (id) {
    case 1:
      //disponible
      return (colorD = "green");
      break;
    case 2:
      //llegado
      return (colorD = "blue");
      break;
    case 3:
      //agotado
      return (colorD = "red");
      break;
    case 4:
      //limitado
      return (colorD = "orange");
      break;
    default:
      break;
  }
};

//==========================COMPONENT=========================
export default function CardFront(props) {
  const clientValid = useSelector((state) => state.users?.client?.id);
  const sell = useSelector((state) => state.product.sell);
  const theme = useTheme();

  let PB = Number(props.precio_base).toFixed();
  let PT = ((1 + Number(props.iva) / 100) * Number(PB)).toFixed();
  PB = PB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  PT = PT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  colorsDot(props.estado);
  //------------------------RENDER-------------------------

  return (
    <Box
      key={props.ind}
      margin={1}
      sx={{
        width: "320px",
        height: "530px",
        bgcolor: theme.palette.background.paper,
        boxShadow: 8,
        borderRadius: 2,
        p: 1,
      }}
    >
      <Grid item 
      //border={1} borderColor={"blue"}
      sx={{height:"70px"}}
      >
        <Grid
          container
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          sx={{
            height: "50px",
          }}
        >
          {clientValid ? (
            <Grid
              border={1}
              borderColor={"lightGrey"}
              borderRadius={2}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              sx={{width:80}}
            >
              {/* <Badge badgeContent={sell[props.id]}> */}
                <Grid
                  //shopping cart
                  item
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ ml: 0, mt: 1, cursor: "pointer" }}
                  //border={1}
                  borderColor={"lightgrey"}
                  color={"grey"}
                  borderRadius={"50%"}
                  width="30px"
                  height="30px"
                  onClick={props.handleAddToCart}
                >
                  <ShoppingCartIcon />
                </Grid>
              {/* </Badge> */}
              <ChangeCart
              precio_base={props.precio_base}
              iva={props.iva}
              id={props.id}
              />
            </Grid>
          ) : (
            <Grid item width="60px" height="30px"></Grid>
          )}

          <Typography
            variant="body1"
            // border={1}
            sx={{
              width: "180px",
              // height: "50px",
              textAlign: "center",
            }}
          >
            {"Código: " + String(props.id).padStart(3,'0')}
          </Typography>

          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent=""
            variant="dot"
          >
            <Grid item sx={{ width: "20px" }}></Grid>
          </StyledBadge>
        </Grid>
      </Grid>

      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        onClick={props.onClick}
        justifyContent={"space-around"}
        sx={{
          height: "420px",
          cursor: "pointer",
        }}
        //border={1}
      >
        <img
          style={{ objectFit: "contain" }}
          src={props.prodImg}
          height="220vh"
          width="300vh"
          alt="producto"
          // border="1"
        />

        <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{
            textAlign: "center",
            width: "310px",
            p: 1,
          }}
        >
          {props.nombre}
        </Typography>
        <Divider sx={{ width: "80%" }} />
        <Typography variant="body2">{`Precio: $ ${PB}`}</Typography>
        {/* <Typography variant="body2">{`Precio con IVA: $ ${PT}`}</Typography> */}

        <Grid item width={300} textAlign={"center"}>
          <Typography variant="body2">{props.categoria}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
