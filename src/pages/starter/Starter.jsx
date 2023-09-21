import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { filterByProvider, exitClient } from "../../redux/actions";
import { useDispatch } from "react-redux";
import StarterView from "./StarterView";

//==================Component=======================
function Starter() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(exitClient());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (prov) => {
    prov === "ALL" ? null : dispatch(filterByProvider(prov));
    navigate("/products");
  };

  let videoWidth = "30%";
  const isSmallScreen = useMediaQuery(`(max-width: 600px)`);
  isSmallScreen ? (videoWidth = "100%") : (videoWidth = "40%");

  //-------------------------Render---------------------
  return (
    <StarterView
      value={value}
      handleChange={handleChange}
      videoWidth={videoWidth}
      handleClick = {handleClick}
    />
  );
}
export default Starter;
