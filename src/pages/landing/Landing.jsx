import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import Login from "../../components/login/Login";
import { logout } from "../../redux/actions";
import { useDispatch } from "react-redux";

const styles = {
  principal: {
    display: "flex",
    justifyContent: "center",
    aligntItems: "center",
    fontWeight: "bold",
    border: "1px solid",
    width: "100vw",
    height: "100vh",
  },
  secondary: {
    display: "flex",
    justifyContent: "center",
    aligntItems: "center",
    fontWeight: "bold",
    border: "1px solid",
    width: "100vw",
    height: "100vh",
  },
};

// //===========================COMPONENT=============================
function Landing() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(logout());
  }, []);

  return (

      <Grid container sx={styles.principal}>
        <Grid
          item
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          xs={7}
          md={4}
          // height={550}
          order={{ xs: 2, md: 1 }}
          // sx={{boxShadow:10}}
        >
         
            <img
              src="https://res.cloudinary.com/sthemma/construland/Logo_Construland.jpg"
              style={{ objectFit: "contain" }}
              width={"100%"}
              sx={{ boxShadow: "15" }}
            ></img>
        
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 1, md: 2 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Login />
        </Grid>
      </Grid>

  );
}
export default Landing;
