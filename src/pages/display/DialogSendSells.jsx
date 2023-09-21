import DialogContent from "@mui/material/DialogContent";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import calculateOpenSells from "./calculateOpenSells";


export default function DialogSendSells (props) {
    const ventas = props.rows;
    const totalOpenSells = calculateOpenSells(ventas);

    return (
        <Grid container display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Grid item sx={{mb:3}} display={"flex"} 
            flexDirection={"column"}
            alignItems={"center"}
            >
                <Typography variant="h5" >{props.user}</Typography>
                <Typography variant="h6">Qué bien! Tu resumen de ventas se ha descargado.</Typography>
                <Typography>Ya puedes hacer tu pedido.</Typography>
            </Grid>

            <Grid item sx={{mb:3}} display={"flex"} flexDirection={"column"}
            alignItems={"center"} >
                {/* <Typography variant="h5">Gracias por tu compra! 🧡</Typography> */}
       
                <Typography variant="h5"
                sx={{mt:2}}
                >Tus ventas totales fueron: $ {totalOpenSells<1 ? 0 : Math.trunc(totalOpenSells).toLocaleString()}</Typography>
            </Grid>
            <Button variant="outlined"
            onClick={()=>props.setOpenSendSells(false)}
            >cerrar</Button>
        </Grid>
    )
}