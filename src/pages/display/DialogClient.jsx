import DialogContent from "@mui/material/DialogContent";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function DialogClient(props) {
  return (
    <DialogContent>
      <>
        {!props.crearCliente && (
          <Autocomplete
            disablePortal
            autoHighlight
            id="combo-box-clientes"
            getOptionLabel={(option) => option.name}
            options={props.myClients}
            onChange={props.handleClientSelected}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.id} - {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Seleccione un cliente existente" />
            )}
          />
        )}
        {props.crearCliente && <Typography variant={"h6"}>Crear un Nuevo Cliente</Typography>}

        <>
          <TextField
            id="idCliente"
            label="Identificación"
            type="Number"
            value={props.clientId || ""}
            sx={{ margin: 1, width: 400 }}
            disabled={!props.crearCliente}
            onChange={() => props.setClientId(event.target.value)}
          />
          <TextField
            id="nombreCliente"
            label="Nombre"
            type="text"
            value={props.clientName || ""}
            sx={{ margin: 1, width: 400 }}
            disabled={!(props.editarCliente || props.crearCliente)}
            onChange={() => props.setClientName(event.target.value)}
          />
          <Grid item display={"flex"}>
            <TextField
              id="emailCliente"
              label="email"
              type="text"
              sx={{ margin: 1 }}
              value={props.clientEmail || ""}
              disabled={!(props.editarCliente || props.crearCliente)}
              onChange={() => props.setClientEmail(event.target.value)}
              fullWidth
            />
            <TextField
              id="phoneCliente"
              label="Celular"
              type="text"
              sx={{ margin: 1 }}
              value={props.clientCell || ""}
              disabled={!(props.editarCliente || props.crearCliente)}
              onChange={() => props.setClientCell(event.target.value)}
              fullWidth
            />
          </Grid>
          <TextField
            id="direccionCliente"
            label="Dirección"
            type="text"
            sx={{ margin: 1 }}
            value={props.clientDir || ""}
            disabled={!(props.editarCliente || props.crearCliente)}
            onChange={() => props.setClientDir(event.target.value)}
            fullWidth
          />
        </>
        {/* : null} */}
      </>
      {props.clientId && !props.editarCliente && !props.crearCliente ? (
        <>
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            onClick={() => props.setEditarCliente(true)}
          >
            Editar información
          </Button>

          <Button
            variant="contained"
            sx={{ margin: 1 }}
            onClick={props.handleBuscarCliente}
          >
            Tomar Pedido
          </Button>
        </>
      ) : null}

      {!(props.clientId || props.crearCliente) ? (
        <Button
          variant="contained"
          sx={{ margin: 1, width: 200 }}
          onClick={() => props.setCrearCliente(true)}
        >
          Crear Clente
        </Button>
      ) : null}
      {props.editarCliente ? (
        <Button
          variant="contained"
          sx={{ margin: 1, width: 200 }}
          onClick={props.handleUpdateClient}
        >
          Guardar
        </Button>
      ) : null}

      {props.crearCliente && props.clientId && (
        <Button
          variant="contained"
          sx={{ margin: 1 }}
          onClick={props.handleCrearCliente}
        >
          Guardar Nuevo Cliente
        </Button>
      )}
    </DialogContent>
  );
}
