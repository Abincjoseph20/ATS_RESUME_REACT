import {Link} from 'react-router-dom';
import './Navbar.css'

function Navbar(){
    return(
        <nav className='navbar' >
            <Link to='/' className='nav-link'>Home</Link>
            <Link to='/ats' className='nav-link' >Ats</Link>
            <Link to='/contact' className='nav-link'>Contact</Link>
            <Link to='/Shortlisted' className='nav-link'>Shortlisted</Link>
        </nav>
    );
}
export default Navbar;