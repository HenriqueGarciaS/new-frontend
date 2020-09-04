import React,{Component} from 'react';
import logo from '../../images/logo.png';
import  './HeaderServico.css'


export default class HeaderServico extends Component{


    render(){
        return (
            <div className = "HeaderServico">
                <img src = {logo} alt = ""/>
                <div className = "area-Usuario">
                <button id = "voltar">Voltar</button>
                <img src = "" id = "fotoUsuario" alt = ""/>
                </div>
            </div>
        )
    }


}
