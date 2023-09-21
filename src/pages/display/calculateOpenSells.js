export default function calculateOpenSells(openSellData) {
  let totalV = 0;

  openSellData.map((osd) => {
    totalV += osd.precioBase * osd.quantity * (1 + osd.tax / 100);
  });
  return totalV;
}
