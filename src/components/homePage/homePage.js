import React from 'react';
import './homePage.css';
import background from '../../images/background1.jpg';
import phone from '../../images/iphone1.png'

const homePage = ()=> (
    
    <section>
        
        <div className="img">            
            <img className="img-background" src={background}/>
        </div>        

        <h3 className="title-welcome">BEM-VINDO</h3>

        <h1 className="text-apresentation">
            EmFormal <br/>
            Uma plataforma prática<br/>
            Para encontrar serviços.
        </h1>

        <div>
            <img className="img-phone" src={phone}/>
        </div>
        
    </section>
)

export default homePage