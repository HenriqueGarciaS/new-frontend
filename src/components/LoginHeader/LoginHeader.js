import React, { Component } from 'react';
import '../LoginHeader/LoginHeader.css'
import logo from '../../images/logo.png';
import img from '../../images/placeholder.png';
import user from '../../images/No-user.png';
import axios from 'axios';


const urlUsuario = 'http://localhost:3001/usuario/';

export default class LoginHeader extends Component{

    componentDidMount(){
        axios.get(urlUsuario+window.localStorage.getItem("id_usuario")).then(res =>{
            let src = "http://localhost:3001/"+res.data.foto
            let foto = document.getElementById("placeholder");
            if(src !== "http://localhost:3001/")
            foto.src = src;
            else
            foto.src = user;
        })
    }

    gotoServico(){
        window.location.href = "http://localhost:3000/CadastrarServico"
    }

    render(){
        return (
            <div className = "navbar">
                <img src = {logo} alt = ""/>
                <button id = "anunciar" onClickCapture = {this.gotoServico}>Anunciar</button>
                <img src = {img} id = "placeholder" alt = ""/>
                
            </div>
        )
    }
    
}