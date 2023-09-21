import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SaveIcon from "@mui/icons-material/Save";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import { useSelector } from "react-redux";



export default function SpeedD(props) {
  const clientValid = useSelector((state) => state.users?.client?.id);
  return (
    <>
      <SpeedDial
        ariaLabel="DrawerSD"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<LocalMallIcon />}
        hidden={props.HidSpeedDial}
        open={props.openSpeedDial}
        //onClick={props.onClick()}
        > 
        {clientValid && 
        <SpeedDialAction
          key="ver carrito"
          icon={<ShoppingCartIcon sx={{ color: props.colorPrimario }} />}
          tooltipTitle="Ver Carrito"
          onClick={props.handleCurrentSell}
        /> }
        {clientValid && 
        <SpeedDialAction
          key="save sell"
          icon={<SaveIcon sx={{ color: props.colorPrimario }} />}
          tooltipTitle="Guardar y Salir"
          onClick={()=>props.setOpenCloseSell(true)}
        />
        }
        


        <SpeedDialAction
          key="ver ventas abiertas"
          icon={<SendAndArchiveIcon sx={{ color: props.colorPrimario }} />}
          // icon={<SellIcon sx={{ color: colorPrimario }} />}
          tooltipTitle="Ver Ventas Abiertas"
          onClick={props.handleVerVentasAbiertas}
        />
      </SpeedDial>
    </>
  );
}
