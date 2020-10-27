import './Cadastro.css';
import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import axios from 'axios';
import socket from '../../socketConfig.js';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const numeroRegex = RegExp(
    /\(\d{2,}\)\d{4,}\-\d{4}/
  );

const baseUrl = "http://localhost:3001/Usuario"


export default class Cadastro extends Component{
    state = {
        usuario:{
            nome:"",
            sobrenome:"",
            estado:"",
            cidade:"",
            email:"",
            fone:"",
            senha:"",
            confirmSenha:"",
            foto:""
        },
        isEmpty:true,
        telephoneValid:false,
        emailValid:false,
        passwordValid:false
    }

    save(event){
        event.preventDefault();
        const data = new FormData();
        data.append("file",this.state.usuario.foto);
        data.append("nome",this.state.usuario.nome);
        data.append("sobrenome",this.state.usuario.sobrenome);
        data.append("estado",this.state.usuario.estado);
        data.append("telefone",this.state.usuario.fone)
        data.append("cidade",this.state.usuario.cidade);
        data.append("email",this.state.usuario.email);
        data.append("senha",this.hashPassWord(this.state.usuario.senha));
        axios.post(baseUrl,data).then(res =>{
            window.localStorage.setItem("id_usuario",res.data.id);
            window.localStorage.setItem("foto_usuario",res.data.foto);
            window.localStorage.setItem("nome_usuario",res.data.nome);
            socket.emit("usuarioConectado",res.data.nome);
            window.location.href = "http://localhost:3000/PaginaLogada";
        }).catch(res => { 
            window.alert("Não foi possivel fazer o cadastro, por favor tente novamente");    
        })

    }

    updateField(event){
        const usuario  = {...this.state.usuario};
        let isEmpty = false;
        usuario[event.target.name] = event.target.value;
        if(usuario.nome === "" || usuario.sobrenome === ""  || usuario.estado === "" || usuario.cidade === "")
        isEmpty = true;
        this.setState({usuario,isEmpty});
    }

    validateEmail(event){
        const usuario = {...this.state.usuario};
        let emailValid = true;
        usuario[event.target.name] = event.target.value;
        if(usuario.email === "" || !emailRegex.test(usuario.email)){
        emailValid = false;
        document.getElementById('lblemail').style.color = "red";
        document.getElementById("lblemail").innerHTML = "E-mail:* (Deve se seguir o exemplo 'teste@teste.com)'";
        }
        else{
        document.getElementById("lblemail").innerHTML = "E-mail:*"
        document.getElementById("lblemail").style.color = "black";
        }
        this.setState({usuario,emailValid});
    }

    validatePhone(event){
        const usuario = {...this.state.usuario};
        let telephoneValid = true;
        usuario[event.target.name] = event.target.value;
        if(usuario.fone === "" || !numeroRegex.test(usuario.fone)){
            telephoneValid = false;
            document.getElementById('lbltelefone').innerHTML = "Telefone:* (Deve se seguir o exemplo (11)1111-1111)";
            document.getElementById('lbltelefone').style.color = "red";
        }
        else{
            document.getElementById('lbltelefone').innerHTML = "Telefone:*";
            document.getElementById('lbltelefone').style.color = "black";
        }

        this.setState({usuario,telephoneValid});

    }

    validatePassword(event){
        const usuario = {...this.state.usuario};
        let passwordValid = false;
        usuario[event.target.name] = event.target.value
        if((usuario.senha !== "" && usuario.confirmSenha !== "") && (usuario.senha === usuario.confirmSenha)){
        document.getElementById("lblsenha").innerHTML = "Senha:*";
        document.getElementById("lblsenha").style.color = "black";
        passwordValid = true;
        }
        else{
        document.getElementById("lblsenha").innerHTML = "Senha:* (As duas senhas não são iguais)"
        document.getElementById("lblsenha").style.color = "red";
        }
        this.setState({usuario,passwordValid});
    }

    displayImg(event){
        let img = document.getElementById("fotoUsuarioForm");
        if(event.target.files.length !== 0)
        img.src = URL.createObjectURL(event.target.files[0]);
        else
        img.src = "";
    }

    fileSelect(event){
        const usuario = {... this.state.usuario};
        usuario[event.target.name] = event.target.files[0];
        this.setState({usuario});
        this.displayImg(event);
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
        return (<div>
            <Header/>
            <div className = "pagina-Cadastro">
                <p>Criar uma nova conta</p>
                <div className = "form-area">
                    <form method = "POST" onSubmit = {event => this.save(event)}>
                    <div className = "row">
                        <div className = "col">
                            <label for = "nome" id = "lblNome" className = "labelForm">Nome:*</label>
                            <input type = "text" id = "nome" name = "nome" className = "input" onChange = {event => this.updateField(event)}/>
                        </div>
                        <div className = "col">
                            <label for = "sobrenome" id ="lblSobrenome" className = "labelForm">Sobrenome:*</label>
                            <input typee = "text" id = "sobrenome" name = "sobrenome" className = "input" onChange = {event => this.updateField(event)}/> 
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col">
                        <label for = "estado" id = "lblEstado" className = "labelForm">Estado:*</label>
                        <select name = "estado" id = "estado" className = "input" onChange = {event => this.updateField(event)}>
                            <option disabled = "true" selected = "true">Escolha um estado</option>
                            <option value = "Acre">Acre</option>
                            <option value = "Alagoas">Alagoas</option>
                            <option value = "Amapá">Amapá</option>
                            <option value = "Bahia">Bahia</option>
                            <option value = "Ceará">Ceará</option>
                            <option value = "Distrito Federal(DF)">Distrito Federal(DF)</option>
                            <option value = "Espírito Santo">Espírito Santo</option>
                            <option value = "Goias">Goiás</option>
                            <option value = "Maranhão">Maranhão</option>
                            <option value = "Mato Grosso">Mato Grosso</option>
                            <option value = "Mato Grosso do Sul">Mato Grosso do Sul</option>
                            <option value = "Pará">Pará</option>
                            <option value = "Paraíba">Paraíba</option>
                            <option value = "Paraná">Paraná</option>
                            <option value = "Pernambuco">Pernambuco</option>
                            <option value = "Piauí">Piauí</option>
                            <option value = "Rio de Janeiro">Rio de Janeiro</option>
                            <option value = "Rio Grande do Norte">Rio Grande do Norte</option>
                            <option value = "Rio Grande do Sul">Rio Grande do Sul</option>
                            <option value = "Rondônia">Rondônia</option>
                            <option value = "Roraima">Roraima</option>
                            <option value = "Santa Catarina">Santa Catarina</option>
                            <option value = "São Paulo">São Paulo</option>
                            <option value = "Sergipe">Sergipe</option>
                            <option value = "Tocantins">Tocantins</option>
                        </select>
                        </div>
                        <div className = "col">
                            <label for = "cidade" id = "lblCidade" className = "labelForm">Cidade:*</label>
                            <input type = "text" id = "cidade" name = "cidade" className = "input" onChange = {event => this.updateField(event)}/>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col">
                            <label for = "email" id = "lblemail" className = "labelForm">E-mail:*</label>
                            <input type = "email" id = "email" name = "email" className = "input" onChange = {event => this.validateEmail(event)}/>
                        </div>
                        <div className = "col">
                            <label for = "fone" id = "lbltelefone" className = "labelForm">Telefone:*</label>
                            <input type = "text" id = "fone" name = "fone" className = "input" onChange = {event => this.validatePhone(event)}/>
                        </div>
                    </div>
                    <div className = "row" id = "segundaSenha">
                        <div className = "col">
                            <label for = "senha" id = "lblsenha" className = "labelForm">Senha:*</label>
                            <input type = "password" id = "senha" name = "senha" className ="input" onChange = {event => this.validatePassword(event)}/>
                        </div>
                        <div className = "col">
                            <label for = "confirmSenha" id = "lblconfirmSenha" className = "labelForm">Confirmar Senha:*</label>
                            <input type = "password" id = "confirmSenha" name = "confirmSenha" className = "input" onChange = {event => this.validatePassword(event)}/>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col">
                            <label for = "foto" id = "labelFotoUsuario" className = "labelForm">Foto de Perfil:</label>
                            <input type = "file" id = "foto" name = "foto" accept = "image/*" onChange = {event => this.fileSelect(event)}/>
                            <img id = "fotoUsuarioForm"/>
                        </div>
                    </div>
                    <div className = "btn-area">
                        <button type = "submit" id="btn" disabled = {this.state.isEmpty || !this.state.passwordValid || !this.state.emailValid || !this.state.telephoneValid}>Cadastrar</button>
                        <a href = "http://localhost:3000/Entrar" id = "link">Já tem conta?</a>
                    </div>
                    </form>
                </div>
            </div>
        </div>)
    }
}