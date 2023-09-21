import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

export default function Todos(props) {
  return (
      <ListItem>
    <Button
      variant="outlined"
      color="success"
      sx={{ width: "100%" }}
      // sx={{ backgroundColor: "black" }}
      onClick={props.handleResetClick}
    >
      todos
    </Button>
    </ListItem>
  );
}
