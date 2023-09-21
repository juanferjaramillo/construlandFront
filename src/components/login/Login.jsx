import React from "react";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import LoginForm from "./loginForm";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: theme.shadows[3],
}));

export default function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Grid container
    display={"flex"}
    justifyContent={"center"}
    sx={{mt:5, mb:5}}>
  
    <StyledPaper sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          alignSelf: "center",
          marginTop: "15px",
          marginBottom: "10px",
          fontSize: "20px",
        }}
      >
        Bienvenido a Construland
      </Typography>
      <Box
        sx={{
          [theme.breakpoints.down("sm")]: { width: 300 },
          [theme.breakpoints.up("sm")]: { width: 350 },
          height: " 70%",
          paddingBottom: "20px",
        }}
      >
        <LoginForm />
        {/* <Box sx={{ marginLeft: "20px" }}>
        <Typography>Don't have an account?</Typography>
        <Button onClick={() => { navigate('/register') }} variant={'contained'}>Register</Button>
      </Box> */}
      </Box>
    </StyledPaper>
    </Grid>
  );
}
