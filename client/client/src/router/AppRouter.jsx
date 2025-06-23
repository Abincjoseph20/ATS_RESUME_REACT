import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import AtsScore from "../pages/AtsScore";


function AppRounter(){
    return(
    <Router>
     <Navbar/>
        <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/contact" element={<Contact/>} />
         <Route path="/ats" element={<AtsScore/>}/>
        </Routes>
    </Router>
    )
}
export default AppRounter;