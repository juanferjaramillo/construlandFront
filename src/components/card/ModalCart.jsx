import { Typography, Divider, Grid } from "@mui/material";
import { DialogContent, TextField, Button } from "@mui/material";

export default function ModalCart(props) {
  // <Dialog open={false} onClose={() => setOpenAddCart(false)}>
  // <Dialog open={openAddCart} onClose={() => setOpenAddCart(false)}>
  <>
    <Grid
      item
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Grid item>
        <Typography sx={{ margin: 2 }}>{props.nombre}</Typography>
      </Grid>
      <Grid item>
        <Button onClick={() => props.setOpenAddCart(false)}>🆇</Button>
      </Grid>
    </Grid>

    <Divider />

    {/* <DialogTitle>Cantidad:</DialogTitle> */}
    <DialogContent>
      <Grid
        item
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ p: 3, m: 2 }}
        borderRadius={3}
        // border={1}
      >
        <Button
          variant="outlined"
          sx={{ fontSize: 25 }}
          onClick={props.handleLessSell}
        >
          -
        </Button>

        <TextField
          sx={{ margin: 1, width: 70 }}
          autoFocus
          id="cant"
          type="text"
          variant="standard"
          value={props.sellQtyL}
          // value={sellQtyG[props.id]}
          // onChange={() => setSellQtyL(event.target.value)}
          // fullWidth
        />
        <Button
          variant="outlined"
          sx={{ fontSize: 25 }}
          onClick={props.handleMoreSell}
        >
          +
        </Button>
      </Grid>
      <Grid item display={"flex"} justifyContent={"center"}>
        <Button
          variant="contained"
          sx={{ margin: "auto" }}
          onClick={props.handleQtyToCart}
          fullWidth
        >
          Listo!
        </Button>
      </Grid>
    </DialogContent>
  </>;
}
