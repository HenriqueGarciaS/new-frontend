import React, { Component } from 'react';
import '../LoginHeader/LoginHeader.css'
import logo from '../../images/logo.png';
import img from '../../images/placeholder.png';
import user from '../../images/No-user.png';
import api from '../../services/api';


const urlUsuario = 'http://localhost:3001/usuario/';

export default class LoginHeader extends Component{

    componentDidMount(){
        api.get("/usuario/"+window.localStorage.getItem("id_usuario")).then(res =>{
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

    goToUserPage = () =>{
        window.location.href = "http://localhost:3000/PaginaUsuario";
    }

    render(){
        return (
            <div className = "navbar">
                <img src = {logo} alt = ""/>
                <button id = "anunciar" onClickCapture = {this.gotoServico}>Anunciar</button>
                <img src = {img} id = "placeholder" alt = "" onClickCapture = {this.goToUserPage}/>
                
            </div>
        )
    }
    
}