import React, {Component} from 'react';
import logo from '../../images/logo.png';
import './Autenticacao.css';



export default class Autenticacao extends Component{

    state = {
        login:{
            email:"",
            senha:"",
        },
        isEmpty:true
    }

    render(){
        return(
           <div className = 'fundo'>
               <div className = 'aut-form'>
                   <img src = {logo} alt = "" id = "logo"/>
                   <form method = "Post">
                       <div className = "inputArea">
                       <label for = "e-mail" className = "lbl">E-mail:</label>
                       <br/>
                       <input type = "email" placeholder = "Digite seu e-mail aqui" className = "inputText"/>
                       <br/>
                       <label for = "Senha" className = "lbl">Senha:</label>
                       <br/>
                       <input type = "password" placeholder = "Digite sua senha aqui" className = "inputText"/>
                       <br/>
                       </div>
                       <div className = "buttonArea">
                           <a href="" className = "senha">Esqueceu a sua senha?</a>
                           <br/>
                           <button type = 'submit' className = "btn">Entrar</button>
                           <br/>
                           <button className = "btn">Cadastrar</button>
                           <br/>
                       </div>
                   </form>
               </div>
           </div>

        )
    }



}