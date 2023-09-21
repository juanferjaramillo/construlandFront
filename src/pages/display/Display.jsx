import { useEffect, useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "../../components/card/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClient } from "../../redux/actions";
import { Toaster, toast } from "sonner";
import { resetBoard } from "../../redux/actions";
import {
  searchClient,
  exitClient,
  clearSells,
  filterByCurrentSell,
} from "../../redux/actions";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import Layout from "./Layout";
import Cliente from "./Cliente";

const maxCards = 6; //number of cards to render at a time

//===================================COMPONENT=====================================
function Display() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [initCard, setInitCard] = useState(0);
  const [render, setRender] = useState(true);
  const [cardsOnDisplay, setCardsOnDisplay] = useState([]);
  const [open, setOpen] = useState(false);
  const [crearCliente, setCrearCliente] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCell, setClientCell] = useState("");

  // const userId = useSelector((state) => state.users.authUser.id);
  // const clienteBuscado = useSelector((state) => state.users.client);
  // const sloganOwner = useSelector(
    // (state) => state.users.authUser?.owner?.sloganOwner
  // );
  const filtProds = useSelector((state) => state.product.filteredProducts);
  const colorPrimario = `#${useSelector(
    (state) => state.users?.authUser?.owner?.colorPrimario
  )}`;
  const colorSecundario = `#${useSelector(
    (state) => state.users?.authUser?.owner?.colorSecundario
  )}`;
  const colorTerciario = `#${useSelector(
    (state) => state.users?.authUser?.owner?.colorTerciario
  )}`;
  // const sells = useSelector((state) => state.product.sell);
  // console.log("sells at beginning", sells);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isSmallScreen = useMediaQuery(`(max-width: 600px)`);
  const isSmallScreen = useMediaQuery(`(max-width: 900px)`);
  let data = [];

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // toast.success("Bienvenido!");
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCardsOnDisplay(filtProds.slice(0, initCard + maxCards));
  }, [initCard, render]);

  useEffect(() => {
    setRender((r) => !r);
  }, [filtProds]);

  // useEffect(() => {
  //   // console.log("clienteBuscado2", clienteBuscado);
  //   if (clienteBuscado) {
  //     setClientName(clienteBuscado.name);
  //     setOpen(false);
  //   } else {
  //     toast.error("Este cliente no existe aún 🤨");
  //   }
  // }, [clienteBuscado]);

  //------------------------------Handles-----------------------------
  function handleScroll() {
    // console.log(document.documentElement.scrollTop);
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1000
    ) {
      document.documentElement.scroll;
      setInitCard((init) => init + maxCards);
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleInicioClick = async () => {
    dispatch(resetBoard());
    setClientId("");
    setClientName("");
    setClientEmail("");
    setClientCell("");
    // console.log("userId", userId);
    // console.log('clienteBuscado',clienteBuscado);
    // console.log("sellsLenght", Object.keys(sells).length);
    Object.keys(sells).length > 0
      ? await axios.post("/recSell", { userId, clienteBuscado, sells })
      : null;
    dispatch(exitClient());
    dispatch(clearSells());
    navigate("/starter");
  };

  const handleCloseClient = () => {
    setOpen(false);
  };

  const handleOpenCliente = () => {
    setOpen(true);
  };

  const handleCrearCliente = () => {
    const newClient = {
      id: clientId,
      name: clientName,
      email: clientEmail,
      phone: clientCell,
      userId: userId,
    };
    dispatch(getClient(newClient));
    // await axios.post("/client", newClient);
    setOpen(false);
    setCrearCliente(false);
    toast("Cliente creado 👍🏻");
  };

  const handleBuscarCliente = async () => {
    // console.log("cl", clientId);
    dispatch(searchClient(clientId));
  };

  const handleCurrentSell = () => {
    dispatch(filterByCurrentSell(sells));
  };

  // const handleVerVentasAbiertas = () => {
  //   //consulta bd por ventas con estado open
  //   console.log("ventas abiertas");
  //   setSellData(true); //mostrar el modal de ventas abiertas
  //   // navigate("/sellData");
  // };

  //==================================RENDER======================================
  return (
    <>
      <Layout>
        <Grid
          item
          display={"flex"}
          justifyContent={"center"}
          sx={{ flexWrap: "wrap" }}
        >
          {cardsOnDisplay.length > 0
            ? cardsOnDisplay.map((prod, index) => {
                let estado = 1;
                if (prod.existencia / prod.rotacion <= prod.limitado / 100) {
                  estado = 4;
                }
                if (prod.existencia / prod.rotacion <= prod.agotado / 100) {
                  estado = 3;
                }
                //1-disponible / 2-llegado / 3-agotado / 4-limitado
                return (
                  <Card
                    key={index}
                    ind={index}
                    id={prod.id}
                    nombre={prod.nombre}
                    Barras={prod.codigoBarras}
                    precio_base={prod.precioBase}
                    prodImg={prod.prodUrl}
                    descripcion={prod.descripcion}
                    categoria={prod.category?.name} //array of objects with name:""
                    iva={prod.tax?.tax}
                    icons={prod.icons} //array of objects with iconUrl
                    estado={estado}
                    existencia={prod.existencia}
                  />
                );
              })
            : null}
        </Grid>
      </Layout>
    </>
  );
}

export default Display;
