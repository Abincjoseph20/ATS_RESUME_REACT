import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <nav style={{ padding: '10px', backgroundColor: '#f5f5f5' }} >
            <Link to='/' style={{ margin: '0 10px' }} >Home</Link>
            <Link to='/ats' style={{ margin: '0 10px' }} >Ats</Link>
            <Link to='/contact' style={{ margin: '0 10px' }}>Contact</Link>
        </nav>
    );
}
export default Navbar;