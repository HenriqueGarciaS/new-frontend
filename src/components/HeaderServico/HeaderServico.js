import React,{Component} from 'react';
import logo from '../../images/logo.png';
import user from '../../images/No-user.png';
import  './HeaderServico.css'


export default class HeaderServico extends Component{

   goBack(){
       window.location.href = "http://localhost:3000";
   }


   goToUserPage = () =>{
    window.location.href = "http://localhost:3000/PaginaUsuario";
}

    render(){
        let src
        if(localStorage.getItem("foto_usuario") == "")
        src = user;
        else
        src = 'http://localhost:3001/'+localStorage.getItem('foto_usuario'); 
        return (
            <div className = "HeaderServico">
                <img src = {logo} alt = ""/>
                <button id = "voltar" onClickCapture = {this.goBack}>Voltar</button>
                <img src = {src} id = "foto-Usuario" alt = "" onClickCapture = {this.goToUserPage}/>
            </div>
        )
    }


}
