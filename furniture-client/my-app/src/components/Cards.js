import React from 'react'
import CardItem from './CardItem'
import './Cards.css';

function Cards() {
    return (
        <div className="cards">
            <p>Jedno od omiljenih mjesta svakog ukućanina je kuhinja i upravo
               zato želimo da Vaš kuhinjski prostor uredimo po Vašem ukusu,
            kako biste se osjećali prijatno dok spremate omiljena jela za Vaše najmilije.
            Spremni smo da udovoljimo svakom Vašem zahtjevu i želji sa ciljem
            da Vaš dom bude upotpunjen funkcionalnošću i ljepotom koju naš kuhinjski dizajn pruža. </p><br></br>
            <h1>Izdvojili smo za Vas !</h1>
            
            <div className="cards-container">
                <div className="cards-wrapper">
                    <ul className="cards-items">
                        <CardItem
                        src="images/kitchen1.jpg"
                        text="Uz dobru kuhinju se bolje kuva"
                        label='Kitchen'
                        path='/furniture'
                        />
                
                    <CardItem
                        src="images/kitchen2.jpg"
                        text="Biramo samo najbolje za Vas"
                        label='Kitchen'
                        path='/furniture'
                        />

                     <CardItem
                        src="images/kitchen4.jpg"
                        text="Kuhinja po vašem ukusu i mjeri"
                        label='Kitchen'
                        path='/furniture'
                        />
                    </ul>
                </div>
            </div>
           <h1>Uživajte u prvoj jutarnjoj kafi u udobnosti naše nove baštenske garniture</h1>
        </div>
    )
}

export default Cards
