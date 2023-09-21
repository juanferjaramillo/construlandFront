import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Dialog, DialogTitle } from "@mui/material";
import DialogClient from "./DialogClient";

export default function ModalCliente(props) {
  return (
    <Dialog open={props.open} onClose={props.handleCloseClient}>
      <Grid item display={"flex"} justifyContent={"space-between"}>
        <DialogTitle>Clientes</DialogTitle>
        <Button
          onClick={() => {
            props.setOpen(false);
            props.setClientId(null);
            props.setEditarCliente(false);
            props.setCrearCliente(false);
          }}
        >
          X
        </Button>
      </Grid>
      <DialogClient
        myClients={myClients}
        handleClientSelected={handleClientSelected}
        handleBuscarCliente={handleBuscarCliente}
        setCrearCliente={setCrearCliente}
        crearCliente={crearCliente}
        setEditarCliente={setEditarCliente}
        editarCliente={editarCliente}
        handleUpdateClient={handleUpdateClient}
        setClientId={setClientId}
        clientId={clientId}
        setClientName={setClientName}
        clientName={clientName}
        setClientDir={setClientDir}
        clientDir={clientDir}
        setClientCell={setClientCell}
        clientCell={clientCell}
        setClientEmail={setClientEmail}
        clientEmail={clientEmail}
        handleCrearCliente={handleCrearCliente}
      />
    </Dialog>
  );
}
