export default function totalizeSellsById(inputArray) {
  let TotalSellsGrouped = {};
  // console.log("inputArray", inputArray);
  if (inputArray.length > 0) {
    const summaryMap = inputArray.map((obj) => {
      const {
        clientId,
        clienteNombre,
        productCodigo,
        productoNombre,
        quantity,
        precioBase,
        tax,
      } = obj;
      //inicializa el array para empezar:
      if (!TotalSellsGrouped[clientId]) {
        TotalSellsGrouped[clientId] = {
          clientId,
          clienteNombre,
          productCount: 0,
          productUnitsT: 0,
          totalPrice: 0,
          detalle: {},
        };
      }

      //adiciona el producto nuevo al detalle
      if (!TotalSellsGrouped[clientId].detalle[productCodigo]) {
        //el producto no esta en la lista aun.
        TotalSellsGrouped[clientId].detalle[productCodigo] = {
          valor: quantity * precioBase * (1 + tax / 100),
          productUnits: quantity,
          productCodigo: productCodigo,
          productoNombre: productoNombre,
        };
        TotalSellsGrouped[clientId].productCount =
          TotalSellsGrouped[clientId].productCount + 1;
        TotalSellsGrouped[clientId].productUnitsT =
          TotalSellsGrouped[clientId].productUnitsT + quantity;
      } else {
        //el producto ya existe, adicionelo a los acumuladores
        TotalSellsGrouped[clientId].detalle[productCodigo] = {
          productUnits:
            TotalSellsGrouped[clientId].detalle[productCodigo].productUnits +
            quantity,
          valor:
            TotalSellsGrouped[clientId].detalle[productCodigo].valor +
            quantity * precioBase * (1 + tax / 100),
          productCodigo: productCodigo,
          productoNombre: productoNombre,
        };
        TotalSellsGrouped[clientId].productUnitsT =
          TotalSellsGrouped[clientId].productUnitsT + quantity;
      }
      // TotalSellsGrouped[clientId].productUnits =
      //   TotalSellsGrouped[clientId].productUnits + quantity;

      TotalSellsGrouped[clientId].totalPrice +=
        quantity * precioBase * (1 + tax / 100);

      return TotalSellsGrouped;
    });

    // console.log("TotalSellsGrouped1", TotalSellsGrouped);
    const summaryArray = Object.values(TotalSellsGrouped);
    return summaryArray;
    // return acc;
  }
}
