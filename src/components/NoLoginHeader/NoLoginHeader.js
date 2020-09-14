import React, { Component } from 'react';
import '../NoLoginHeader/NoLoginHeader.css'
import logo from '../../images/logo.png';



export default class NoLoginHeader extends Component{

    GotoLogin(){
        window.location.href = "http://localhost:3000/entrar";
    }

    render(){
        return(
        <div className = "navbar">
            <img src={logo}  alt = ""/>
            <button name = "anunciar" id = "anunciar" className = "button" onClick = {this.GotoLogin} >Anunciar</button>
            <button name = "entrar" id = "entrar" className = "button" onClick = {this.GotoLogin}>Entrar</button>
        </div>
        )
    }

}