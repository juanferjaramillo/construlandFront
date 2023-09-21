import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
    Typography,
    Button
  } from "@mui/material";

export default function Cliente(props) {
  return (
    <>
      <TextField
        autoFocus
        id="id"
        label="identificacion"
        type="text"
        variant="filled"
        onChange={props.setClientId}
        // fullWidth
      />
      {props.crearCliente ? null : (
        <Button
          variant="outlined"
          sx={{ margin: 1 }}
          onClick={props.handleBuscarCliente}
        >
          Buscar
        </Button>
      )}

      <Divider />

      {crearCliente ? (
        <>
          <TextField
            id="nombreCliente"
            label="Nombre"
            type="text"
            sx={{ margin: 1 }}
            onChange={props.setClientName}
            fullWidth
          />
          <TextField
            id="emailCliente"
            label="email"
            type="text"
            sx={{ margin: 1 }}
            onChange={props.setClientEmail}
            fullWidth
          />
          <TextField
            id="phoneCliente"
            label="Celular"
            type="text"
            sx={{ margin: 1 }}
            onChange={props.setClientCell}
            fullWidth
          />
        </>
      ) : (
        <Button
          variant="contained"
          sx={{ margin: 1 }}
          onClick={props.setCrearClienteTrue}
        >
          Crear / Editar
        </Button>
      )}
      <Button
        variant="contained"
        sx={{ margin: 1 }}
        onClick={() => {
            props.setOpenFalse;
          props.setCrearClienteFalse;
        }}
      >
        Cancelar
      </Button>

      {crearCliente ? (
        <Button
          variant="contained"
          sx={{ margin: 1 }}
          onClick={props.handleCrearCliente}
        >
          Listo!
        </Button>
      ) : null}
    </>
  );
};
