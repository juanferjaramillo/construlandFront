import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabPanel from "./TabPanel";
import WorkIcon from "@mui/icons-material/Work";
import FiberNewIcon from "@mui/icons-material/FiberNew";

export default function StarterView(props) {
  const { value, handleChange, handleClick, videoWidth } = props;

  const GridImage = ({ children }) => {
    return (
      <Grid
        item
        display={"flex"}
        boxShadow={3}
        margin={2}
        justifyContent={"center"}
      >
        {children}
      </Grid>
    );
  };

  //-------------------RENDER-----------------
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        item
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            // aria-label="basic tabs example"
            centered
          >
            <Tab icon={<WorkIcon />} label="Proveedores" />
            <Tab icon={<FiberNewIcon />} label="Novedades" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0} id={"proveedores"}>
          <Grid
            item
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            <GridImage>
              <img
                src="https://res.cloudinary.com/sthemma/calixto/logosProveedores/sfgroup.png"
                alt="providers"
                onClick={() => handleClick("ALL")}
                height={"100px"}
                style={{ objectFit: "contain", cursor: "pointer" }}
              />
            </GridImage>
            <GridImage>
              <img
                src="https://res.cloudinary.com/sthemma/calixto/logosProveedores/flexy.png"
                alt="providers"
                onClick={() => handleClick("ALL")}
                height={"100px"}
                style={{ objectFit: "contain", cursor: "pointer" }}
              />
            </GridImage>
            <GridImage>
              <img
                src="https://res.cloudinary.com/sthemma/calixto/logosProveedores/ecohome.png"
                alt="providers"
                value="ECOHOME"
                onClick={() => handleClick("ECOHOME")}
                height={"100px"}
                style={{ objectFit: "contain", cursor: "pointer" }}
              />
            </GridImage>
            <GridImage>
              <img
                src="https://res.cloudinary.com/sthemma/calixto/logosProveedores/wake.png"
                alt="providers"
                onClick={() => handleClick("UP NUTRICIONAL FOOD SAS")}
                height={"50px"}
                style={{ objectFit: "contain", cursor: "pointer" }}
              />
            </GridImage>
            <GridImage>
              <img
                src="https://res.cloudinary.com/sthemma/calixto/logosProveedores/kala.png"
                alt="providers"
                onClick={() => handleClick("GRECO")}
                height={"100px"}
                style={{ objectFit: "contain", cursor: "pointer" }}
              />
            </GridImage>
            <GridImage>
              <img
                src="https://res.cloudinary.com/sthemma/calixto/logosProveedores/El_dorado.png"
                alt="providers"
                onClick={() => handleClick("EL DORADO COMEX SAS")}
                height={"100px"}
                style={{ objectFit: "contain", cursor: "pointer" }}
              />
            </GridImage>
            <GridImage>
              <img
                src="https://res.cloudinary.com/sthemma/calixto/logosProveedores/Nature.png"
                alt="providers"
                onClick={() => handleClick("TERRAFERTIL COLOMBIA SAS")}
                height={"100px"}
                style={{ objectFit: "contain", cursor: "pointer" }}
              />
            </GridImage>
            <GridImage>
              <img
                src="https://res.cloudinary.com/sthemma/calixto/logosProveedores/amira.jpg"
                alt="providers"
                onClick={() => handleClick("AMIRA SAS")}
                height={"100px"}
                style={{ objectFit: "contain", cursor: "pointer" }}
              />
            </GridImage>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1} id={"videos"}>
          <Grid
            item
            display={"Flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"wrap"}
            padding={1}
            width={"90vw"}
            height={"80vh"}
            sx={{ cursor: "pointer" }}
          >
            <video
              type="video/mp4"
              width={videoWidth}
              src={
                "https://res.cloudinary.com/sthemma/video/upload/calixto/videos/video1.mp4"
              }
              controls
              // src={video2}
              // autoPlay
              // loop
              // muted
              // poster="https://assets.codepen.io/6093409/river.jpg"
            ></video>

            <video
              type="video/mp4"
              width={videoWidth}
              src={
                "https://res.cloudinary.com/sthemma/video/upload/calixto/videos/video2.mp4"
              }
              controls
            ></video>

            <video
              type="video/mp4"
              width={videoWidth}
              src={
                "https://res.cloudinary.com/sthemma/video/upload/calixto/videos/video3.mp4"
              }
              controls
            ></video>

            <video
              type="video/mp4"
              width={videoWidth}
              src={
                "https://res.cloudinary.com/sthemma/video/upload/calixto/videos/video4.mp4"
              }
              controls
            ></video>
          </Grid>
        </TabPanel>
      </Grid>
    </Box>
  );
}
