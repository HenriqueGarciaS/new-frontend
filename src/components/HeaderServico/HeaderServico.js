import React,{Component} from 'react';
import logo from '../../images/logo.png';
import  './HeaderServico.css'


export default class HeaderServico extends Component{

   goBack(){
       window.location.href = "http://localhost:3000";
   }


    render(){
        return (
            <div className = "HeaderServico">
                <img src = {logo} alt = ""/>
                <button id = "voltar" onClickCapture = {this.goBack}>Voltar</button>
                <img src = {"http://localhost:3001/"+localStorage.getItem("foto_usuario")} id = "foto-Usuario" alt = ""/>
            </div>
        )
    }


}
