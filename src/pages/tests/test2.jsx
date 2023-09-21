import * as XLSX from 'xlsx';

export default function Test2(props) {
  MYdata = props.sells;
// const MYdata = [
//   {"title":"primera", "website":"Foo"},
//   {"title":"segunda", "website":"Bar"}
// ]

const worksheet = XLSX.utils.json_to_sheet(MYdata);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
XLSX.writeFile(workbook, "MYSavedData.xlsx");
}