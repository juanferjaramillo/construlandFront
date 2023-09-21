import { Route, Routes } from "react-router-dom";
import Landing from "../src/pages/landing/Landing";
import Test from "./pages/tests/test.jsx";
import Test2 from "./pages/tests/test2.jsx";
import axios from "axios";
import Display from "../src/pages/display/Display";
import Starter from "../src/pages/starter/Starter";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

function App() {
  //-------------------------------------------------------------------------------

  return (
    <Routes>

      <Route exact path={"/"} element={<Landing />} />
      {/* <Route exact path={"/"} element={<Display />} /> */}
      {/* <Route exact path={"/starter"} element={<Starter />} /> */}
      <Route exact path={"/products"} element={<Display />} />
      {/* <Route  exact path={"/test2"} element={<Test2 />} /> */}
      {/* <Route  exact path={"/test2"} element={<Card2 />}> </Route> */}
    </Routes>
  );
}

export default App;
