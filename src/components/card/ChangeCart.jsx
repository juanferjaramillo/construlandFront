import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sell } from "../../redux/actions";

//================COMPONENT==========================
export default function ChangeCart(props) {
  const { id } = props;

  let sellQtyG = useSelector((state) => state.product.sell);

  //const [cartQty, setCartQty] = useState(null);

  const dispatch = useDispatch();

  const handleMoreCart = () => {
    const sellValue = Number(props.precio_base) * (1 + Number(props.iva) / 100);
    //console.log(sellQtyG[id], sellValue);
    !sellQtyG[id] ? sellQtyG[id] = 0: null;
    dispatch(sell(id, sellQtyG[id] + 1, sellValue));
  };
  // const handleMoreCart = () => {
  //   setCartQty((x) => x + 1);
  //   const sellValue = Number(props.precio_base) * (1 + Number(props.iva) / 100);
  //   console.log(cartQty, sellValue);
  //   dispatch(sell(id, cartQty + 1, sellValue));
  // };

  const handleLessCart = () => {
    const sellValue = -1 * Number(props.precio_base) * (1 + props.iva / 100);
    //console.log(sellQtyG[id], sellValue);
    sellQtyG[id] > 0 && dispatch(sell(props.id, sellQtyG[id] - 1, sellValue));
  };
  // const handleLessCart = () => {
  //   cartQty > 0 && setCartQty((x) => x - 1);
  //   const sellValue = -1 * Number(props.precio_base) * (1 + props.iva / 100);
  //   console.log(cartQty, sellValue);
  //   cartQty > 0 && dispatch(sell(props.id, cartQty - 1, sellValue));
  // };

  return (
    <Grid
      item
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      backgroundColor={"lightGrey"}
      sx={{ width: 80 }}
    >
      <button onClick={handleLessCart} style={{ margin: 2, width: 25 }}>
        -
      </button>

      <Typography>{sellQtyG[id] > 0 ? sellQtyG[id] : ""}</Typography>

      <button onClick={handleMoreCart} style={{ margin: 2, width: 25 }}>
        +
      </button>
    </Grid>
  );
}
