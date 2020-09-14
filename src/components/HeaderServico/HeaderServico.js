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
                <div className = "area-Usuario">
                <button id = "voltar" onClickCapture = {this.goBack}>Voltar</button>
                <img src = "" id = "fotoUsuario" alt = ""/>
                </div>
            </div>
        )
    }


}
