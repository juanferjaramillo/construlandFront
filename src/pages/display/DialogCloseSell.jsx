import DialogContent from "@mui/material/DialogContent";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";


export default function DialogCloseSell (props) {
    const sells = useSelector((state) => state.product?.sell);
    const sellValue = useSelector((state) => state.product?.sellValue);

    return (
        <Grid container display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Grid item sx={{mb:3}} display={"flex"} 
            flexDirection={"column"}
            alignItems={"center"}
            >
                <Typography variant="h5" >{props.cliente}</Typography>
                <Typography>hoy has comprado:</Typography>
            </Grid>

            <Grid item 
            
            border={1}
            borderRadius={2}
            sx={{mb:3, width:"100%"}} display={"flex"} flexDirection={"column"}
            alignItems={"center"}
            >
            {Object.keys(sells).length > 0 &&
                <>
                  <Typography variant="h6">
                     {Object.keys(sells).filter((s) => sells[s] > 0).length} productos
                  </Typography>
                  <Typography variant="h6">
                    {Object.values(sells)?.reduce((a, x) => a + x)} unidades
                  </Typography>
                </>
              }
            </Grid>
            <Grid item sx={{mb:3}} display={"flex"} flexDirection={"column"}
            alignItems={"center"} >
                <Typography variant="h5">Gracias por tu compra! 🧡</Typography>
       
                <Typography
                sx={{mt:2}}
                >Valor total: $ {sellValue<1 ? 0 : Math.trunc(sellValue).toLocaleString()}</Typography>
            </Grid>
            <Button variant="outlined"
            onClick={()=>props.handleInicioClick()}
            >cerrar</Button>
        </Grid>
    )
}