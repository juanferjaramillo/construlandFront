//mapea la info de ventas y pasa cada venta (objeto con las ventas a cada cliente)
//al child <InfoSales> para que renderice el detalle de ventas del cliente
import { useState } from "react";
import InfoSales from "./InfoSales";

export default function SellsForTable(props) {
  const [open, setOpen] = useState(false);
  const { totalSells}= props;

  return (
    <>
      {totalSells?.map((t) => {
        return <InfoSales t={t} />;
      })}
    </>
  );
}
