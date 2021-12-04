import React from 'react'
import {Link} from 'react-router-dom'

function CardItem(props) {
    return (
        <>
     <li className="cards-item"></li> 
     <Link className="cards-item-link" to={props.path}>
         <figure className="cards-wrapp" data-categoty={props.label}>
             <img src={props.src} className="cards-item-img"></img>
         </figure>
         <div className="cards-item-info">
             <h5 className="cards-item-text">{props.text}</h5>
         </div>
     </Link>
        </>
    )
}

export default CardItem
