import {
  Dialog,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  DialogTitle
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import EditIcon from "@mui/icons-material/Edit";
import useColors from "./hooks/useColors";

export default function InfoSales(props) {
  const [open, setOpen] = useState(false);
  const { colorPrimario, colorSecundario } = useColors();
  const { t, setOpenEdit } = props;

  const handleEditSell = () => {
    // alert(
    //   `pronto podras editar la información de esta venta!`
    // );
    setOpenEdit("flex");
  };

  return (
    <>
      <TableRow sx={{ backgroundColor: "darkgray" }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{t.clientId}</TableCell>
        <TableCell>{t.clienteNombre}</TableCell>
        <TableCell>{t.productCount}</TableCell>
        <TableCell>{t.productUnitsT}</TableCell>
        <TableCell>{Math.trunc(t.totalPrice).toLocaleString()}</TableCell>
      </TableRow>

      <TableRow
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} unmountOnExit>
            <Typography>Detalle de venta</Typography>
            <Table>
              {/* tabla de detalle de ventas */}
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Código</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cant</TableCell>
                  <TableCell>Precio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(t.detalle).map((k) => {
         
                  return (
                    <>
                      <TableRow>
                        <TableCell>
                          <EditIcon
                            sx={{ cursor: "pointer", color: colorSecundario }}
                            onClick={handleEditSell}
                          />
                        </TableCell>
                        <TableCell>{t.detalle[k].productCodigo}</TableCell>
                        <TableCell>{t.detalle[k].productoNombre}</TableCell>
                        <TableCell>{t.detalle[k].productUnits}</TableCell>{" "}
                        <TableCell>
                          {Math.trunc(t.detalle[k].valor).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    
    </>
  );
}
