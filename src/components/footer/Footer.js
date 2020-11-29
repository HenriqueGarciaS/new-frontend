import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer className="app-footer">

        <article className="box1">
            <h2 className="b1-title">
                EmFormal
            </h2>

            <p className="a1">
                Uma plataforma prática que vai facilitar sua vida sempre que precisar de algum serviço.
            </p>
        </article>
                
        <article className="box2">
            <h4 id="contato">
                Contato
            </h4>

            <p className="a2">
               contato@emformal.com.br <br/>
               Telefone: (19) 9999 9999 <br/>  
            </p> 
        </article>

        <article className="box3">
            <h4 id="link">
                Site Links
            </h4>

            <ul>
                <li id="link1">Home</li>
                <li id="link1">Sobre</li>
                <li id="link1">FAQ</li>
            </ul>
        </article>

    </footer>
)

export default Footer

/*
=========== primeiro codigo ==========================
 <div className="app-footer__message">
            <div className="app-footer__box">               
                <article className="box1">
                    <h2 className="b-title">EmFormal</h2>
                    <p className="a1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
                    </p>
                </article>
                
                <article>
                    <h4 className="b-title">Contato</h4>
                    <p className="a2">
                        ################<br/>
                        ################ <br/>
                        ################<br/>		        
                    </p>

                    <p className="a2">
                      contato@emformal.com.br <br/>
                      Telefone: (19) 9999 9999 <br/>  
                    </p> 
                </article>

                <article>
                    <h4 className="b-title">Site Links</h4>
                    <ul>
                        <li>Home</li>
                        <li>Sobre</li>
                        <li>FAQ</li>
                        <li>Termos</li>
                        <li>Politica de Privacidade</li>
                    </ul>
                </article>
            </div>
            
        </div>

*/