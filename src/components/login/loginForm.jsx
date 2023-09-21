import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, getProdsUser, logout } from "../../redux/actions";
import { Toaster, toast } from "sonner";
import VisibilityIcon from '@mui/icons-material/Visibility';

const validationSchema = Yup.object({
  email: Yup.string().required("Por favor ingrese su indentificación"),
  password: Yup.string().required("Por favor ingrese su contraseña"),
});

//===============================COMPONENT===============================
function LoginForm() {
  const [id, setId] = useState(localStorage.getItem("User"));
  const [pswInput, setPswInput] = useState("");
  const [showPsw, setShowPsw] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pswValid = useSelector((state) => state.users?.authUser?.password);
  // console.log("pswValid1: ", pswValid);
  // console.log("password ingresado1: ", pswInput);

  const initialValues = {
    email: id,
    password: "",
  };


  const submitHandler = async ({ email, password }) => {
    // console.log("dispatch ready");
    // console.log("pswValid2",pswValid);
    setPswInput(password);
    setId(email);
    dispatch(getAuthUser(email)); //brings the authUser to the state
  };

  useEffect(
    ()=>{
    setPswInput(1);
    setId(1);
    dispatch(getAuthUser(1)); //brings the authUser to the state
    dispatch(getProdsUser(id)); //brings products and providers of that user to the state
    navigate("/products")
    }, 
  [])

  useEffect(() => {
    // console.log("pswValid3: ", pswValid);
    // console.log("password ingresado2: ", pswInput);
    if (pswInput === pswValid) {
      // console.log("permitido");
      dispatch(getProdsUser(id)); //brings products and providers of that user to the state
      navigate("/starter");
    } else {
      // console.log("negado");
      toast.error("La identificación o la contraseña son incorrectos 😳");
      dispatch(logout())
    }
  }, [pswValid]);

  //--------------------------RENDER------------------------

  return (
    <Box>
      {/* <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {(formik) => {
          const { errors, touched, isSubmitting } = formik;
          return (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "20px",
                }}
              >
                <Field
                  sx={{ marginBottom: "20px" }}
                  placeholder="identificación"
                  name="email"
                  as={TextField}
                  error={errors.email && touched.email}
                  helperText={
                    errors.email && touched.email ? errors.email : null
                  }
                />
                <Grid item display={"flex"} justifyContent={"space-around"}>
                <Field
                
                  placeholder="Contraseña"
                  type={showPsw}
                  name="password"
                  as={TextField}
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : null
                  }
                />
                <IconButton 
                
                onClick={()=>{showPsw==="password" ? setShowPsw("text"): setShowPsw("password")}}
                >
               <VisibilityIcon  />
               </IconButton>
               </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ mt: 3, backgroundColor: "red" }}
                >
                  Ingresar
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik> */}
    </Box>
  );
}
export default LoginForm;
