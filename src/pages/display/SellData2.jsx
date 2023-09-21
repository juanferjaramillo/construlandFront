//Crea el modal y el formato de la DataTable, para renderizar un child
//en <SellsForTable>
import { TableCell, TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SellsForTable from "./SellsForTable";
import { useState } from "react";

//====================COMPONENT===============
export default function SellData2(props) {
  //MIS VENTAS ABIERTAS
  const { totalSells, closeModal } = props;

  const handleCloseModal = () => {
    closeModal();
  };
  //---------------------------render----------------
  return (
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxHeight: "500px",
      }}
      // border={1}
    >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography marginTop={-2}>Mis ventas abiertas</Typography>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  sx={{ position: "absolute", right: 25, top: 15, p: 0 }}
                  onClick={handleCloseModal}
                >
                  X
                </Button>
              </TableCell>
            </TableRow>
            <TableRow editable={true}>
              <TableCell />
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Unidades</TableCell>
              <TableCell>Valor Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <SellsForTable id={0} totalSells={totalSells} />
          </TableBody>
        </Table>
      </TableContainer>

      <Grid
        item
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        sx={{ pt: 2 }}
      >
        <Grid
          item
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Typography>Tu Pedido:</Typography>
          <Typography
            // border={1}
            boxShadow={5}
            borderRadius={10}
            textAlign={"center"}
            backgroundColor={props.colorPrimario}
            color={props.colorSecundario}
            sx={{ width: 150 }}
            fontWeight={"bold"}
          >
            {"$ " + Math.trunc(props.totalOpenSells).toLocaleString()}
          </Typography>
        </Grid>

        <Button variant="outlined" onClick={props.down}>
          Descargar
        </Button>

        <Button variant="outlined" onClick={props.place}>
          Hacer Pedido
        </Button>
      </Grid>
    </Grid>
  );
}
