import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMyClients } from "../../../redux/actions";

export default function useSpeedDial(props) {
  const { userId, handleScroll } = props;
  const dispatch = useDispatch();
  const [hidSpeedDial, setHidSpeedDial] = useState(true);
  const [openSpeedDial, setOpenSpeedDial] = useState(true);

  useEffect(() => {
    Number(userId) === 1 ? setHidSpeedDial(true) : setHidSpeedDial(false);
    Number(userId) === 1 ? setOpenSpeedDial(false) : setOpenSpeedDial(true);
    dispatch(getMyClients(userId));
    window.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);
  return {
    hidSpeedDial,
    openSpeedDial,
  };
}
