import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sell } from "../../redux/actions";
import ModalCart from "./ModalCart";

//-------------------------COMPONENT------------------------
function Card(props) {
  const [flipped, setFlipped] = useState(false);
  const [openAddCart, setOpenAddCart] = useState(false);
  const [sellQtyL, setSellQtyL] = useState(0);

  const dispatch = useDispatch();
  const sellQtyG = useSelector((state) => state.product.sell);

  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleAddToCart = () => {
    setSellQtyL(sellQtyG[props.id] || 1);
    setOpenAddCart(true);
  };

  const handleQtyToCart = () => {
    const sellValue =
      sellQtyL * Number(props.precio_base) * (1 + props.iva / 100);
    sellQtyL > 0 ? dispatch(sell(props.id, sellQtyL, sellValue)) : null;
    setOpenAddCart(false);
  };

  const handleMoreSell = () => {
    let cant = sellQtyL || 1;
    setSellQtyL(cant + 1);
  };

  const handleLessSell = () => {
    let cant = sellQtyL || 0;
    // console.log(cant);
    sellQtyL > 0 ? setSellQtyL(cant - 1) : setSellQtyL(0);
  };

  //-------------------------Render---------------------

  return (
    <>
      <Dialog open={openAddCart} onClose={() => setOpenAddCart(false)}>
        <ModalCart
          nombre={props.nombre}
          setOpenAddCart={setOpenAddCart}
          handleLessSell={handleLessSell}
          sellQtyL={sellQtyL}
          handleMoreSell={handleMoreSell}
          handleQtyToCart={handleQtyToCart}
        />
      </Dialog>
      <ReactCardFlip
        isFlipped={flipped}
        flipDirection="horizontal"
        flipSpeedBackToFront={0.8}
        flipSpeedFrontToBack={0.8}
      >
        <CardFront
          handleAddToCart={handleAddToCart}
          onClick={handleClick}
          precio_base={props.precio_base}
          iva={props.iva}
          ind={props.ind}
          id={props.id}
          prodImg={props.prodImg}
          nombre={props.nombre}
          categoria={props.categoria}
          estado={props.estado}
        />
        <CardBack
          onClick={() => handleClick()}
          ind={props.ind}
          prodImg={props.prodImg}
          descripcion={props.descripcion}
          icons={props.icons}
          Barras={props.Barras}
          existencia={props.existencia}
          id={props.id}
          nombre={props.nombre}
        />
      </ReactCardFlip>
    </>
  );
}
export default Card;
