import React, {Component} from 'react';
import logo from '../../images/logo.png';
import './Autenticacao.css';
import axios from 'axios';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const baseURL = 'http://localhost:3001/loginUsuario';


export default class Autenticacao extends Component{

    state = {
        login:{
            email:"",
            senha:"",
        },
        isEmpty:true
    }


    save = (event) =>{
        event.preventDefault();
        const data = new FormData()
        data.append("email",this.state.login.email);
        data.append("senha",this.state.login.senha);
        axios.post(baseURL,this.state.login).then(res=>{
            window.localStorage.setItem("id_usuario",res.data.id);
            window.location.href = 'http://localhost:3000/PaginaLogada';
        }).catch(res=>{
            let aviso = document.getElementById("aviso")
            aviso.innerHTML = "E-mail ou senha não existem";
            aviso.style.color = "red";
            aviso.style.fontWeight = "bold";

        })
    }

    updateField = (event) =>{
        const login = {...this.state.login}
        let isEmpty = false;
        login[event.target.name] = event.target.value;
        if(login.email === "" || login.senha == "")
        isEmpty = true;
        this.setState({login,isEmpty});
        
    }

    render(){
        return(
           <div className = 'fundo'>
               <div className = 'aut-form'>
                   <img src = {logo} alt = "" id = "logo"/>
                   <form method = "Post" onSubmit = {e => this.save(e)}>
                       <small id = "aviso"></small>
                       <div className = "inputArea">
                       <label for = "email" className = "lbl">E-mail:</label>
                       <br/>
                       <input type = "text" placeholder = "Digite seu e-mail aqui" name = 'email' className = "inputText" onChange = {e => this.updateField(e)}/>
                       <br/>
                       <label for = "Senha" className = "lbl">Senha:</label>
                       <br/>
                       <input type = "password" placeholder = "Digite sua senha aqui" name = 'senha' className = "inputText" onChange = {e => this.updateField(e)}/>
                       <br/>
                       </div>
                       <div className = "buttonArea">
                           <a href="" className = "senha">Esqueceu a sua senha?</a>
                           <br/>
                           <button type = 'submit' className = "btn" disabled = { this.state.isEmpty}>Entrar</button>
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