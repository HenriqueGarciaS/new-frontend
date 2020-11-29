import React from  'react';
import './HowWork.css';

const HowWork = () =>(
    <div className="total-page">
        <h2 className="titlePage">Como trabalhamos?</h2>

        <div className="conteudo">
            <article className="text-descrition">
                
                <h4 id="sub-title">
                    Sign-up
                </h4>
                <p id="text">
                    Faça seu cadastro totalmente gratuito e tenha acesso a plataforma completa.
                </p>
            </article>

            <article className="text-descrition">

                <h4 id="sub-title">
                    Anuncie
                </h4>

                <p id="text">
                    Anuncie seu serviço e expanda seu negócio para nossa plataforma ganhar visibilidade no mercado.
                </p>
            </article>
        </div>

        <div className="conteudo">
            <article className="text-descrition">

                <h4 id="sub-title">
                    Contrate
                </h4>

                <p id="text">
                    Busque profissionais em diversos setores e contrate aquele que for melhor para sua necessidade.
                </p>
            </article>

            <article className="text-descrition">

                <h4 id="sub-title">
                    Compartilhe sua experiência
                </h4>

                <p id="text">
                    Compartilhe sua experiencia com outros usuários. Avalie os anuncientes com um bom serviço, ou comente o que pode ser melhorado.
                </p>
            </article>
        </div>
    </div>


)

export default HowWork