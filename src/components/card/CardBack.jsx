import {
    Box,
    Grid,
    Typography,
    Divider,
    useTheme,
    useMediaQuery,
    Avatar,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import Badge from "@mui/material/Badge";
  
  let colorD = "white";
  
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: colorD,
      color: colorD,
      // width: "1vw",
      // height: "1vw",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  
  
  //================component==================
  export default function CardBack(props) {
    const theme = useTheme();
    // console.log(props);
    return (
        <Box
        key={props.ind}
        margin={1}
        // onMouseLeave={handleClick}
        onClick={props.onClick}
        sx={{
          width: "320px",
          height: "530px",
          bgcolor: theme.palette.background.paper,
          boxShadow: 8,
          borderRadius: 2,
          p: 1,
        }}
      >
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-around"}
          sx={{
            height: "500px",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1">{"Codigo: " + String(props.id).padStart(3,"0")}</Typography>

          {/* <Typography variant="body2">{props.existencia}</Typography> */}
          
          <Grid item
          sx={{height:"150px"}}
          boxShadow={4}
          >
          <Typography 
          sx={{ fontSize: 13 }}
          // fontSize={13} 
          textAlign="justify" p={1} >
            {props.descripcion}
          </Typography>
          </Grid>
  
          <img
            style={{ objectFit: "contain" }}
            src={props.prodImg}
            height="150vh"
            width="240vh"
            alt="producto"
            // border="1"
          />
  
          <Divider sx={{ width: "80%" }} />
          <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{
            textAlign: "center",
            width: "310px",
            p: 1,
          }}
        >
          {props.nombre}
        </Typography>
          {/* <Grid item display={"flex"} justifyContent={"center"} marginTop={1}>
            {props.icons?.map((icon, i) => {
              return (
                <Avatar
                  key={i}
                  alt="icon"
                  src={icon.iconUrl}
                  sx={{
                    width: 40,
                    height: 40,
                    marginRight: 0.5,
                    marginLeft: 0.5,
                  }}
                ></Avatar>
              );
            })}
          </Grid> */}
        </Grid>
      </Box>
    )
  }