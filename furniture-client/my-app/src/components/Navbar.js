 import React ,{ useState } from 'react';

 import { Link } from 'react-router-dom';

 import './Navbar.css';

 function Navbar() {

    //const [click, setClick] = useState(false);
    
   
     return (
         
             <>
             <nav className="navbar">
             <div className="navbar-container">
             
           <h1 className='naslov'></h1> 
          
          <ul className='nav-menu'>
            <li className='nav-item'>
              <Link to='/' className='nav-links' >
                Početna
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/manufacturer' className='nav-links' >
                O nama
              </Link>
             </li>

             <li className='nav-item'>
              <Link to='/furniture' className='nav-links' >
                Proizvodi
              </Link>
             </li>
             
             <li className='nav-item'>
              <Link to='/profil' className='nav-links' >
                Profil
              </Link>
             </li> 

             <li className='nav-item'>
              <Link to='/login' className='nav-links' >
                LOGIN
              </Link>
             </li>
             <li className='nav-item'>
              <Link to='/register' className='nav-links' >
                SIGN UP
              </Link>
             </li>

            
           
             </ul>

           
             
            

          
            </div>

             </nav>
             
         </>
     )
 }
 
 export default Navbar
 