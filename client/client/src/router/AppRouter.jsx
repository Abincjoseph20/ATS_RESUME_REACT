import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import AtsScore from "../pages/AtsScore";
import Shortlisted from "../pages/Shortlisted";
import CandidateDetails from "../pages/CandidateDetail";

function AppRouter(){
    return(
    <Router>
     <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/ats" element={<AtsScore/>}/>
            <Route path="/contact" element={<Contact/>} />
            <Route path="/Shortlisted" element={<Shortlisted/>}/>   
            <Route path="/candidate/:id" element={<CandidateDetails/>}/>  
        </Routes>
    </Router>
    )
}
export default AppRouter;