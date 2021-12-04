import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';
import { FcGoogle } from "react-icons/fc";


function Footer() {
    return (
        <div className='footer-container'>
             <ul className='flex-row'>
            <li className='footer-item'>
              <Link to='/' className='footer-links' >
                Početna
              </Link>
              
           
            </li>
            
            </ul>
         
            <li className='footer-item'>
              <Link to='/manufacturer' className='footer-links' >
                O nama
              </Link>
             </li>
            
          
             <li className='footer-item'>
              <Link to='/manufacturer' className='footer-links' >
                Kontakt
              </Link>
             </li>
           
        
         
          
            
              

             
             <p className='fin'>&copy; 2021 UCG/IT</p>
               
               
              
              
             
             
               
           
        </div>
    )
}

export default Footer
