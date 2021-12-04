import React from 'react'
import './FirstSection.css';
function FirstSection() {
    return (
        <div>
        <div className='container'>
        <div><img src={"./images/dnevna1.jpg"}></img></div>
        <div><img src={ "./images/dnevna2.jpg"}></img></div>
       <p>Dnevne sobe u kombinaciji sive i žute predstavljaju veoma ljupke<br></br>
       prostore koji osvežavaju i podižu raspoloženje.<br></br>Razlog tome je što žuta
       podsjeća na ljeto i ova njena karakteristika nam je posebno
       neophodna tokom hladnih mjeseci kada nam nedostaje sunčeva
       svjetlost.<br></br>
       Kombinacija sive i žute boje je jedna od najpopularnijih za<br></br>
       različite tipove dekoracija.</p>
     </div>
       <p className="topic"><h1>Za dnevnu sobu bez mane i potpuno uzivanje ! </h1></p>
     </div>
    )
}

export default FirstSection
