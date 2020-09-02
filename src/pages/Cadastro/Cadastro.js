import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Cadastro.css'

export default class Cadastro extends Component{

    state = {
        usuario:{
            nome:"",
            sobrenome:"",
            estado:"",
            cidade:"",
            email:"",
            senha:"",
            confirmSenha:"",
            foto:""
        },
        isEmpty:true,
        passwordValid:false
    }

    save(event){
        
    }

    updateField(event){
        const usuario  = {...this.state.usuario};
        let isEmpty = false;
        let passwordValid = false;
        usuario[event.target.name] = event.target.value;
        if(usuario.nome === "" || usuario.sobrenome === "" || usuario.email === "" || usuario.estado === "" || usuario.cidade === "" || usuario.senha === "" || usuario.confirmSenha === "")
        isEmpty = true;

        if((usuario.senha == usuario.confirmSenha) && (usuario.senha != "" && usuario.confirmSenha != ""))
        passwordValid = true;
    
        this.setState({usuario,isEmpty,passwordValid});
    }

    displayImg(event){
        let img = document.getElementById("usuario");
        img.src = URL.createObjectURL(event.target.files[0]);
    }

    fileSelect(event){
        const usuario = {... this.state.usuario};
        usuario[event.target.name] = event.target.files[0];
        this.setState({usuario});
        this.displayImg(event)
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
                            <input type = "email" id = "email" name = "email" className = "input" onChange = {event => this.updateField(event)}/>
                        </div>
                        <div className = "col">
                            <label for = "senha" id = "lblsenha" className = "labelForm">Senha:*</label>
                            <input type = "password" id = "senha" name = "senha" className ="input" onChange = {event => this.updateField(event)}/>
                        </div>
                    </div>
                    <div className = "row" id = "segundaSenha">
                        <div className = "col">
                            <label for = "confirmSenha" id = "lblconfirmSenha" className = "labelForm">Confirmar Senha:*</label>
                            <input type = "password" id = "confirmSenha" name = "confirmSenha" className = "input" onChange = {event => this.updateField(event)}/>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col">
                            <label for = "foto" id = "fotoUsuario" className = "labelForm">Foto de Perfil:</label>
                            <input type = "file" id = "foto" name = "foto" accept = "image/*" onChange = {event => this.fileSelect(event)}/>
                            <img id = "usuario"/>
                        </div>
                    </div>
                    <div className = "btn-area">
                        <button type = "submit" id="btn" disabled = {this.state.isEmpty || !this.state.passwordValid}>Cadastrar</button>
                        <a href = "http://localhost:3000/Entrar" id = "link">Já tem conta?</a>
                    </div>
                    </form>
                </div>
            </div>
        </div>)
    }
}