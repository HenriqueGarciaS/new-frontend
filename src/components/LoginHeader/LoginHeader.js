import React, { Component } from 'react';
import '../LoginHeader/LoginHeader.css'
import logo from '../../images/logo.png';
import img from '../../images/placeholder.png'

export default class LoginHeader extends Component{

    componentDidMount(){
        console.log("Aqui será pego a imagem do usuário");
    }

    render(){
        return (
            <div className = "navbar">
                <img src = {logo} alt = ""/>
                <button id = "anunciar">Anunciar</button>
                <img src = {img} id = "placeholder" alt = ""/>
                
            </div>
        )
    }
    
}