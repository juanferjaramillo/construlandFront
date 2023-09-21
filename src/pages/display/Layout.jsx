import { useEffect, useRef, useState } from "react";
import Appbar from "./AppBar/";
import SellData2 from "./SellData2";
import calculateOpenSells from "./calculateOpenSells";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClient } from "../../redux/actions";
import { Toaster, toast } from "sonner";
import DrawerContent from "../../components/drawer/Drawer";
import { resetBoard } from "../../redux/actions";
import {
  searchClient,
  exitClient,
  clearSells,
  filterByCurrentSell,
  updateClient,
} from "../../redux/actions";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import axios from "axios";
import * as XLSX from "xlsx";
import SpeedD from "./SpeedD";
import DialogClient from "./DialogClient";
import DialogCloseSell from "./DialogCloseSell";
import DialogSendSells from "./DialogSendSells";
import totalizeSellsById from "./totalizeSellsById";
// import useSpeedDial from "./hooks/useSpeedDial";
import useColors from "./hooks/useColors";

let ss = 0;
const drawerWidth = 180;

//===================================COMPONENT=====================================
export default function Layout(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editarCliente, setEditarCliente] = useState(false);
  const [crearCliente, setCrearCliente] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCell, setClientCell] = useState("");
  const [clientDir, setClientDir] = useState("");
  const [sellData, setSellData] = useState(false);
  const [openSellData, setOpenSellData] = useState([]);
  const [openCloseSell, setOpenCloseSell] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSendSells, setOpenSendSells] = useState(false);

  const userId = useSelector((state) => state.users.authUser.id);
  const userName = useSelector((state) => state.users.authUser.name);
  const sellValue = useSelector((state) => state.product?.sellValue);
  const cliente = useSelector((state) => state.users?.client?.name);

  const clienteBuscado = useSelector((state) => state.users.client);
  const sloganOwner = useSelector(
    (state) => state.users.authUser?.owner?.sloganOwner
  );
  const filtProds = useSelector((state) => state.product.filteredProducts);

  const { colorPrimario, colorSecundario, colorTerciario } = useColors();

  const sells = useSelector((state) => state.product.sell);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(`(max-width: 900px)`);
  let data = [];

  // const { hidSpeedDial, openSpeedDial } = useSpeedDial({
  //   userId,
  //   handleScroll,
  // });

  useEffect(() => {
    setClientName(clienteBuscado.name);
    setClientEmail(clienteBuscado.email);
    setClientCell(clienteBuscado.phone);
    setClientDir(clienteBuscado.address);
  }, [clienteBuscado]);

  //-------------------HANDLERS-----------------------
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1000
    ) {
      document.documentElement.scroll;
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExitClient = () => {
    dispatch(resetBoard());
    setClientId("");
    setClientName("");
    setClientEmail("");
    setClientCell("");
    dispatch(exitClient());
    dispatch(clearSells());
  };

  const handleInicioClick = async () => {
    //setOpenCloseSell(true);
    dispatch(resetBoard());
    setClientId("");
    setClientName("");
    setClientEmail("");
    setClientCell("");
    setOpenCloseSell(false);

    Object.keys(sells).length > 0
      ? await axios.post("/recSell", { userId, clienteBuscado, sells })
      : null;
    dispatch(exitClient());
    dispatch(clearSells());
    // navigate("/starter");
  };

  const handleCloseClient = () => {
    setOpen(false);
  };

  const handleOpenCliente = () => {
    dispatch(exitClient());
    setClientId(null);
    setOpen(true);
  };

  const handleCrearCliente = () => {
    const newClient = {
      id: clientId,
      name: clientName,
      email: clientEmail,
      phone: clientCell,
      userId: userId,
      address: clientDir,
    };
    dispatch(getClient(newClient, userId));
    setOpen(false);
    setEditarCliente(false);
    toast("Cliente creado 👍🏻");
    setCrearCliente(false);
  };

  const handleBuscarCliente = async () => {
    dispatch(searchClient(clientId));
    setOpen(false);
  };

  const handleClientSelected = (event, value) => {
    setClientId(value.id);
    setClientName(value.label);
    dispatch(searchClient(value.id));
  };

  const handleCurrentSell = () => {
    dispatch(filterByCurrentSell(sells));
  };

  const handleCloseSellData = () => {
    setSellData(false);
  };

  const handleVerVentasAbiertas = async () => {
    setLoading(true);
    let os = (await axios.get(`/openSells/${userId}`)).data;
    for (let i in os) {
      const cli = (await axios.get(`/client/${Number(os[i].clientId)}`)).data;
      os[i].clienteNombre = cli.name;
      os[i].address = cli.address;
      const prod = await axios.get(`/product/${Number(os[i].productCodigo)}`);
      os[i].tax = prod.data[0].tax.tax;
      os[i].productoNombre = prod.data[0].nombre;
      os[i].precioBase = Number(prod.data[0].precioBase);
    }
    setLoading(false);
    // console.log("OS", os);
    setOpenSellData(os);
    setSellData(true); //show modal
  };

  const handlePlaceOrder = async () => {
    setSellData(false);
    setOpenSendSells(true);
    await axios.post("/closeSells", { userId });
    handleDownloadSells();
  };

  const handleDownloadSells = async () => {
    let sellDown = [];
    let sellDown2 = [];
    sellDown = totalizeSellsById(openSellData);
    console.log("sellDown", sellDown);
    sellDown.map((obj) => {
      Object.keys(obj.detalle).map((k) => {
        sellDown2.push({
          Id_Cliente: obj.clientId,
          Nombre_Cliente: obj.clienteNombre,
          Codigo_Producto: k,
          valor_Total: obj.detalle[k].valor,
          Cantidad: obj.detalle[k].productUnits,
        });
      });
      sellDown2.push({
        Id_Cliente: obj.clientId,
        Nombre_Cliente: "TOTAL",
        Codigo_Producto: "",
        valor_Total: obj.totalPrice,
        Cantidad: "",
      });
    });
    console.log("sellDown2", sellDown2);
    const worksheet = XLSX.utils.json_to_sheet(sellDown2);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
    XLSX.writeFile(workbook, "MisVentas.xlsx");
    setSellData(false);
  };

  const handleUpdateClient = () => {
    const cliente = {
      id: Number(clientId),
      name: clientName,
      email: clientEmail,
      phone: Number(clientCell),
      address: clientDir,
    };
    setEditarCliente(false);
    setOpen(false);
    dispatch(updateClient(cliente, userId));
  };

  const handleCloseModal = () => {
    setSellData(false);
  };

  const myClients = useSelector((state) => state.users.myClients);

  //-------------------------Modal Cliente------------------------------
  const modalCliente = (
    <Dialog open={open} onClose={handleCloseClient}>
      <Grid item display={"flex"} justifyContent={"space-between"}>
        <DialogTitle>Clientes</DialogTitle>
        <Button
          onClick={() => {
            setOpen(false);
            setClientId(null);
            setEditarCliente(false);
            setCrearCliente(false);
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

  //--------------------------------modal SellData----------------------------
  //MIS VENTAS ABIERTAS
  const modalSellData = (
    //Muestra la datatable con las ventas abiertas (sim pedir al distribuidor)
    <Dialog open={sellData} onClose={() => setSellData(false)}>
      <DialogContent>
        <SellData2
          close={handleCloseSellData}
          place={handlePlaceOrder}
          down={handleDownloadSells}
          totalSells={totalizeSellsById(openSellData)}
          seller={userName}
          colorPrimario={colorPrimario}
          colorSecundario={colorSecundario}
          closeModal={handleCloseModal}
          totalOpenSells={calculateOpenSells(openSellData)}
        />
      </DialogContent>
    </Dialog>
  );

  //----------------------------------modal CloseSell----------------
  const modalCloseSell = (
    //guarda la venta actual en bd
    <Dialog open={openCloseSell}>
      <DialogContent>
        <DialogCloseSell
          openCloseSell={setOpenCloseSell}
          sellValue={sellValue}
          cliente={cliente}
          sells={sells}
          handleInicioClick={handleInicioClick}
        />
      </DialogContent>
    </Dialog>
  );

  //----------------------------------modal SendSells----------------
  const modalSendSells = (
    //Baja el pedido para el distribuidor y cierra las ventas en bd
    <Dialog open={openSendSells}>
      <DialogContent>
        <DialogSendSells
          openSendSells={setOpenSendSells}
          user={userName}
          rows={openSellData}
          setOpenSendSells={setOpenSendSells}
        />
      </DialogContent>
    </Dialog>
  );

  //==================================RENDER======================================
  return (
    <>
      {loading && (
        <Dialog open>
          <DialogContent>
            <Typography>Cargando la información...</Typography>
          </DialogContent>
        </Dialog>
      )}
      {sellData ? modalSellData : null}
      {modalCliente}
      {modalCloseSell}
      {modalSendSells}

      <Box minHeight={"100vh"} sx={{ display: "flex" }}>
        <CssBaseline />
        <Toaster />
        {/* ---------------------------------APP BAR----------------------------     */}
        <Appbar
          drawerWidth={drawerWidth}
          colorPrimario={colorPrimario}
          colorSecundario={colorSecundario}
          sloganOwner={sloganOwner}
          handleDrawerToggle={handleDrawerToggle}
          handleOpenCliente={handleOpenCliente}
          exitClient={handleExitClient}
          clientName={clientName}
          userId={userId}
        />

        {/* ----------------------------------DRAWER----------------------------- */}
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant={isSmallScreen ? "temporary" : "permanent"}
            open={isSmallScreen ? mobileOpen : true}
            onClose={isSmallScreen ? handleDrawerToggle : null}
            sx={{
              display: { xs: "block", md: "block" },

              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <DrawerContent />
          </Drawer>
        </Box>

        {/* -------------------------------BOARD------------------------- */}
        <Box
          component="main"
          backgroundColor={colorSecundario}
          sx={{ width: { md: `calc(100% - ${drawerWidth}px)`, sm: "100%" } }}
        >
          <Toolbar />
          {/* para hacer espacio a la AppBar */}
          {props.children}
        </Box>
      </Box>

      {/* <SpeedD
        HidSpeedDial={hidSpeedDial}
        openSpeedDial={openSpeedDial}
        setOpenCloseSell={setOpenCloseSell}
        handleOpenCliente={handleOpenCliente}
        handleCurrentSell={handleCurrentSell}
        handleVerVentasAbiertas={handleVerVentasAbiertas}
        colorPrimario={colorPrimario}
      /> */}
    </>
  );
}
