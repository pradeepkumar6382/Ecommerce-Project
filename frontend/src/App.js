import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Registerpage from "./Pages/Register";
import Loginpage from "./Pages/Loginpage";
import { Authprovider } from "./context";
import Protectedroute from "./Protectedroute";
import Dashboard from "./Pages/Dashboard";

function App() {
 
  return (
   <>
   <Authprovider> 
   <BrowserRouter>
   <Routes>
   <Route path="/" element={ <Registerpage/>}/>
   <Route path="/login" element={ <Loginpage/>}/>
   <Route path="/dashboard" element={ <Protectedroute><Dashboard/></Protectedroute>}/>
   </Routes>
   </BrowserRouter>  
   </Authprovider>
   </>
  );
}

export default App;
