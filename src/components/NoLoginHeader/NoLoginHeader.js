import React, { Component } from 'react';
import '../NoLoginHeader/NoLoginHeader.css'
import logo from '../../images/logo.png';



export default class NoLoginHeader extends Component{

    render(){
        return(
        <div className = "navbar">
            <img src={logo}  alt = ""/>
            <button name = "anunciar" id = "anunciar" className = "button" alt>Anunciar</button>
            <button name = "entrar" id = "entrar" className = "button">Entrar</button>
        </div>
        )
    }

}