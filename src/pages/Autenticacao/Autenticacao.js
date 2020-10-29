import React, {Component} from 'react';
import logo from '../../images/logo.png';
import './Autenticacao.css';
import api from '../../services/api';
import socket from '../../socketConfig.js';

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
        let login = {
            email: this.state.login.email,
            senha: this.hashPassWord(this.state.login.senha)
        }
        api.post("/loginUsuario",login).then(res=>{
            window.localStorage.setItem("id_usuario",res.data.id);
            window.localStorage.setItem("foto_usuario",res.data.foto);
            window.localStorage.setItem("nome_usuario",res.data.nome);
            socket.emit("usuarioConectado",res.data.nome);
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

    goToCadastrar = () =>{
        window.location.href = 'http://localhost:3000/Cadastrar';
    }

    hashPassWord = (str) => {
        let hash = 0;
        for(let i = 0 ; i < str.length; i++){
            let charCode = str.charCodeAt(i);
            hash += charCode;
        }

        return hash*70;
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
                           <button type = 'submit' className = "btnForm" disabled = {this.state.isEmpty}>Entrar</button>
                           <br/>
                           <button className = "btnForm" onClickCapture = {this.goToCadastrar}>Cadastrar</button>
                           <br/>
                       </div>
                   </form>
               </div>
           </div>

        )
    }



}